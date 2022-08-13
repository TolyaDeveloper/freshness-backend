import mongoose from 'mongoose'
import { ITokenPayload, ITokens } from '../../../interfaces/token.interface'

export interface ITokenService {
  generateAccessAndRefreshTokens: (payload: ITokenPayload) => ITokens
  validateAccessToken: (accessToken: string) => Promise<ITokenPayload>
  validateRefreshToken: (refreshToken: string) => Promise<ITokenPayload>
  saveRefreshToken: (
    refreshToken: string,
    userId: mongoose.Schema.Types.ObjectId
  ) => Promise<string>
}
