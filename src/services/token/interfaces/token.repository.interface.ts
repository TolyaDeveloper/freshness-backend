import { ITokenModel } from '../../../models/token.model'
import mongoose from 'mongoose'

export interface ITokenRepository {
  saveRefreshToken: (
    refreshToken: string,
    userId: mongoose.Schema.Types.ObjectId
  ) => Promise<ITokenModel>
}
