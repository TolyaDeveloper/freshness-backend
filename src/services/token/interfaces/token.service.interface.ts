import mongoose from 'mongoose'
import { ITokenPayload } from '../../../interfaces/token.payload.interface'

export interface ITokenService {
  signAccessToken: (payload: ITokenPayload) => Promise<string>
  signRefreshToken: (payload: ITokenPayload) => Promise<string>
  validateAccessToken: (accessToken: string) => Promise<ITokenPayload>
  validateRefreshToken: (refreshToken: string) => Promise<ITokenPayload>
  saveRefreshToken: (
    refreshToken: string,
    userId: typeof mongoose.Schema.Types.ObjectId
  ) => Promise<string>
}
