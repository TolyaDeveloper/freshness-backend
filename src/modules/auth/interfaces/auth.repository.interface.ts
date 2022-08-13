import { IUserModel } from '../../../models/user.model'
import { SignupDto } from '../dto/signup.dto'

export interface IAuthRepository {
  findByEmail: (email: string) => void
  createUser: (credentials: SignupDto) => Promise<IUserModel>
}
