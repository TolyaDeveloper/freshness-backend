import { injectable, inject } from 'inversify'
import { nanoid } from 'nanoid'
import { TYPES } from '../../types'
import { HttpError } from '../../exceptions/http-error.class'
import { SignupDto } from './dto/signup.dto'
import { hash, compare } from 'bcryptjs'
import { IConfigService } from '../../config/config.service.interface'
import { IAuthService } from './interfaces/auth.service.interface'
import { IUserRepository } from '../user/interfaces/user.repository.interface'
import { LoginDto, UserReturnDto } from './dto/login.dto'
import { ITokenService } from '../../services/token/interfaces/token.service.interface'
import { IMailService } from '../../services/mail/interfaces/mail.service.inerface'
import { UserModelType } from '../../models/user.model'
import { IAuthRepository } from './interfaces/auth.repository.interface'
import { PATH_TO_IMAGES } from '../../constants/common'
import mongoose from 'mongoose'

@injectable()
class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TokenService) private tokenService: ITokenService,
    @inject(TYPES.MailService) private mailService: IMailService,
    @inject(TYPES.AuthRepository) private authRepository: IAuthRepository
  ) {}

  public async signup({
    firstName,
    lastName,
    email,
    password,
    avatarUri
  }: SignupDto) {
    const candidate = await this.userRepository.findUserByEmail(email)

    if (candidate) {
      throw HttpError.USER_ALREADY_EXISTS(email)
    }

    const hashedPassword = await hash(
      password,
      Number(this.configService.get('SALT'))
    )
    const userRole = await this.authRepository.findRoleByName('USER')

    if (!userRole) {
      throw HttpError.ROLE_DOES_NOT_EXIST()
    }

    const activationLink = nanoid()

    const newUser = await this.userRepository.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      activationLink,
      roles: [userRole.role],
      avatarUri: avatarUri
        ? `${PATH_TO_IMAGES.PATH_TO_AVATARS}/${avatarUri}`
        : PATH_TO_IMAGES.DEFAULT_AVATAR
    })

    await this.mailService.sendActivationEmail(
      email,
      `${this.configService.get('SERVER_URI')}/auth/activate/${activationLink}`
    )

    const tokens = this.tokenService.generateAccessAndRefreshTokens({
      _id: newUser._id,
      isActivated: newUser.isActivated,
      roles: newUser.roles as string[]
    })

    await this.tokenService.saveRefreshToken(tokens.refreshToken, newUser._id)

    return { ...tokens, ...new UserReturnDto(newUser) }
  }

  public async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      throw HttpError.USER_DOES_NOT_EXIST(email)
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      throw HttpError.INCORRECT_PASSWORD()
    }

    const tokens = this.tokenService.generateAccessAndRefreshTokens({
      _id: user._id,
      isActivated: user.isActivated,
      roles: user.roles as string[]
    })

    await this.tokenService.saveRefreshToken(tokens.refreshToken, user._id)

    return { ...tokens, ...new UserReturnDto(user) }
  }

  public async activate(id: mongoose.Types.ObjectId): Promise<void> {
    const user = await this.userRepository.findUserByActivationLink(id)

    if (!user) {
      throw HttpError.ACCOUNT_ACTIVATION_FAILED()
    }

    user.isActivated = true

    await user.save()
  }

  public async logout(refreshToken: string): Promise<void> {
    await this.tokenService.removeRefreshToken(refreshToken)
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw HttpError.Unathorized()
    }

    const validatedToken = await this.tokenService.validateToken(
      refreshToken,
      this.configService.get('JWT_REFRESH_SECRET')
    )
    const tokenFromDb = await this.tokenService.findRefreshToken(refreshToken)

    if (!validatedToken || !tokenFromDb) {
      throw HttpError.Unathorized()
    }

    const user = (await this.userRepository.findUserById(
      validatedToken._id
    )) as UserModelType
    const tokens = this.tokenService.generateAccessAndRefreshTokens({
      _id: user._id,
      isActivated: user.isActivated,
      roles: user.roles as string[]
    })

    await this.tokenService.saveRefreshToken(tokens.refreshToken, user._id)

    return { ...tokens, ...new UserReturnDto(user) }
  }
}

export { AuthService }
