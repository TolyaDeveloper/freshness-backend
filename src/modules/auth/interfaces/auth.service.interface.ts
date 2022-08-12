import { SignupDto } from '../dto/signup.dto'

export interface IAuthService {
  signup: (credentials: SignupDto) => Promise<void>
}
