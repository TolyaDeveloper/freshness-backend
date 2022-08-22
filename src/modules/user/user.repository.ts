import { injectable } from 'inversify'
import { IUserRepository } from './interfaces/user.repository.interface'
import { userModel } from '../../models/user.model'
import { SignupDto } from '../auth/dto/signup.dto'
import mongoose from 'mongoose'

@injectable()
class UserRepository implements IUserRepository {
  public async findUserByEmail(email: string) {
    return userModel.findOne({ email }).lean()
  }

  public async createUser(credentials: SignupDto) {
    return userModel.create(credentials)
  }

  public async findUserByActivationLink(activationLink: string) {
    return userModel.findOne({ activationLink })
  }

  public async findUserById(id: mongoose.Types.ObjectId) {
    return userModel.findById(id).lean()
  }
}

export { UserRepository }