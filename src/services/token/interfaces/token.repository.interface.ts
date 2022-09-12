import { type TokenModelType } from '../../../models/token.model'
import mongoose from 'mongoose'

export interface ITokenRepository {
  saveRefreshToken(
    refreshToken: string,
    userId: mongoose.Types.ObjectId
  ): Promise<TokenModelType>
  removeRefreshToken(refreshToken: string): Promise<TokenModelType | null>
  findRefreshTokenByUserId(
    id: mongoose.Types.ObjectId
  ): Promise<(TokenModelType & mongoose.Document) | null>
  findRefreshToken(refreshToken: string): Promise<TokenModelType | null>
}
