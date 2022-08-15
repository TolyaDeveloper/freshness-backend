import { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken'
import { ITokenPayload, ITokens } from '../../../interfaces/token.interface'
import { type TokenModelType } from '../../../models/token.model'
import mongoose from 'mongoose'

export interface ITokenService {
  generateAccessAndRefreshTokens: (payload: ITokenPayload) => ITokens
  validateToken: (
    token: string,
    secret: Secret | GetPublicKeyOrSecret
  ) => Promise<ITokenPayload>
  saveRefreshToken: (
    refreshToken: string,
    userId: mongoose.Types.ObjectId
  ) => Promise<TokenModelType>
}
