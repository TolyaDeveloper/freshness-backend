import { LoginDto } from '../dto/login.dto'
import { SignupDto } from '../dto/signup.dto'
import { ITokens } from '../../../interfaces/token.interface'

export interface IAuthService {
  signup: (credentials: SignupDto) => Promise<ITokens>
  login: (credentials: LoginDto) => Promise<ITokens>
  activate: (link: string) => Promise<void>
  logout: (refreshToken: string) => Promise<void>
  refresh: (refreshToken: string) => Promise<ITokens>
}