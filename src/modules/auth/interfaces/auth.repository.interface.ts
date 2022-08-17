import mongoose from 'mongoose'
import { type UserModelType } from '../../../models/user.model'
import { SignupDto } from '../dto/signup.dto'

export interface IAuthRepository {
  findByEmail: (email: string) => Promise<UserModelType | null>
  createUser: (credentials: SignupDto) => Promise<UserModelType>
  findUserByActivationLink: (
    activationLink: string
  ) => Promise<(UserModelType & mongoose.Document) | null>
  findUserById: (id: mongoose.Types.ObjectId) => Promise<UserModelType | null>
}
