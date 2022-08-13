import { LoginDto } from '../dto/login.dto'
import { SignupDto } from '../dto/signup.dto'
import { ITokens } from '../../../interfaces/token.interface'

export interface IAuthService {
  signup: (credentials: SignupDto) => Promise<void>
  login: (credentials: LoginDto) => Promise<ITokens>
}
