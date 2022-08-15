import { type UserModelType } from '../../../models/user.model'
import { SignupDto } from '../dto/signup.dto'

export interface IAuthRepository {
  findByEmail: (email: string) => Promise<UserModelType | null>
  createUser: (credentials: SignupDto) => Promise<UserModelType>
}
