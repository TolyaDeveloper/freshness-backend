import { type TokenModelType } from '../../../models/token.model'
import mongoose from 'mongoose'

export interface ITokenRepository {
  saveRefreshToken: (
    refreshToken: string,
    userId: mongoose.Types.ObjectId
  ) => Promise<TokenModelType>
}
