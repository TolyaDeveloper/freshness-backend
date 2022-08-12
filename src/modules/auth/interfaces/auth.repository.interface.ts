import { IUserModel } from '../../../models/user.model'
import { SignupDto } from '../dto/signup.dto'

export interface IAuthRepository {
  findByEmail: (email: string) => Promise<IUserModel>
  createUser: (credentials: SignupDto) => Promise<IUserModel>
}
