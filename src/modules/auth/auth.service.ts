import { injectable, inject } from 'inversify'
import { TYPES } from '../../types'
import { SignupDto } from './dto/signup.dto'
import { hash, compare } from 'bcryptjs'
import { IConfigService } from '../../config/config.service.interface'
import { IAuthService } from './interfaces/auth.service.interface'
import { LoginDto } from './dto/login.dto'
import { ITokenService } from '../../services/token/interfaces/token.service.interface'
import { IAuthRepository } from './interfaces/auth.repository.interface'
import { ITokens } from '../../interfaces/token.interface'
import mongoose from 'mongoose'

@injectable()
class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.AuthRepository) private authRepository: IAuthRepository,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TokenService) private tokenService: ITokenService
  ) {}

  public async signup({
    firstName,
    lastName,
    email,
    password
  }: SignupDto): Promise<ITokens> {
    const candidate = await this.authRepository.findByEmail(email)

    if (candidate) {
      throw new Error(`User with email ${email} already exists!`)
    }

    const hashedPassword = await hash(
      password,
      Number(this.configService.get('SALT'))
    )

    const newUser = await this.authRepository.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    const tokens = this.tokenService.generateAccessAndRefreshTokens({
      _id: newUser._id,
      isActivated: newUser.isActivated
    })

    await this.tokenService.saveRefreshToken(tokens.refreshToken, newUser._id)

    return tokens
  }

  public async login({ email, password }: LoginDto): Promise<ITokens> {
    const user = await this.authRepository.findByEmail(email)

    if (!user) {
      throw new Error(`User with email ${email} does not exists!`)
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      throw new Error(`Password is not correct!`)
    }

    const tokens = this.tokenService.generateAccessAndRefreshTokens({
      _id: user._id,
      isActivated: user.isActivated
    })

    await this.tokenService.saveRefreshToken(tokens.refreshToken, user._id)

    return tokens
  }
}

export { AuthService }
