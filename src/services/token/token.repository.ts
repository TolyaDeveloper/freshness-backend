import { injectable } from 'inversify'
import { ITokenModel, tokenModel } from '../../models/token.model'
import { ITokenRepository } from './interfaces/token.repository.interface'
import mongoose from 'mongoose'

@injectable()
class TokenRepository implements ITokenRepository {
  public async saveRefreshToken(
    refreshToken: string,
    userId: mongoose.Schema.Types.ObjectId
  ) {
    return tokenModel.create({ refreshToken, userId })
  }
}

export { TokenRepository }
