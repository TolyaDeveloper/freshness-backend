import { injectable, inject } from 'inversify'
import { TYPES } from '../../types'
import { SignupDto } from './dto/signup.dto'
import { IAuthRepository } from './interfaces/auth.repository.interface'
import { hash } from 'bcryptjs'
import { IConfigService } from '../../config/config.service.interface'
import { IAuthService } from './interfaces/auth.service.interface'

@injectable()
class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.AuthRepository) private authRepository: IAuthRepository,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}

  public async signup({
    firstName,
    lastName,
    email,
    password
  }: SignupDto): Promise<void> {
    const candidate = await this.authRepository.findByEmail(email)

    if (candidate) {
      throw new Error(`User with email ${email} already exists!`)
    }

    const hashedPassword = await hash(
      password,
      Number(this.configService.get('SALT'))
    )

    await this.authRepository.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
  }
}

export { AuthService }
