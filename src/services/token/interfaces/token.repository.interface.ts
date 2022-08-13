import { ITokenModel } from '../../../models/token.model'
import mongoose from 'mongoose'

export interface ITokenRepository {
  saveRefreshToken: (
    refreshToken: string,
    userId: typeof mongoose.Schema.Types.ObjectId
  ) => Promise<ITokenModel>
}
