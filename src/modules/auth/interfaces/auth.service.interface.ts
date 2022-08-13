import { LoginDto } from '../dto/login.dto'
import { SignupDto } from '../dto/signup.dto'

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IAuthService {
  signup: (credentials: SignupDto) => Promise<void>
  login: (credentials: LoginDto) => Promise<ITokens>
}
