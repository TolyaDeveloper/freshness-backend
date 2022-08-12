import { injectable } from 'inversify'
import { userModel, IUserModel } from '../../models/user.model'
import { SignupDto } from './dto/signup.dto'
import { IAuthRepository } from './interfaces/auth.repository.interface'

@injectable()
class AuthRepository implements IAuthRepository {
  public async findByEmail(email: string): Promise<IUserModel> {
    return userModel.findOne({ email }).lean()
  }

  public async createUser(credentials: SignupDto): Promise<IUserModel> {
    return userModel.create(credentials)
  }
}

export { AuthRepository }
