import { injectable } from 'inversify'
import { userModel } from '../../models/user.model'
import { SignupDto } from './dto/signup.dto'
import { IAuthRepository } from './interfaces/auth.repository.interface'

@injectable()
class AuthRepository implements IAuthRepository {
  public async findByEmail(email: string) {
    return userModel.findOne({ email }).lean()
  }

  public async createUser(credentials: SignupDto) {
    return userModel.create(credentials)
  }

  public async findUserByActivationLink(activationLink: string) {
    return userModel.findOne({ activationLink })
  }
}

export { AuthRepository }
