import { UserModelType } from '../../../models/user.model'
import { SignupDto } from '../../auth/dto/signup.dto'
import mongoose from 'mongoose'

export interface IUserRepository {
  findUserByEmail: (email: string) => Promise<UserModelType | null>
  createUser: (credentials: SignupDto) => Promise<UserModelType>
  findUserByActivationLink: (
    activationLink: string
  ) => Promise<(UserModelType & mongoose.Document) | null>
  findUserById: (id: mongoose.Types.ObjectId) => Promise<UserModelType | null>
}
