import { injectable } from 'inversify'
import { tokenModel } from '../../models/token.model'
import { ITokenRepository } from './interfaces/token.repository.interface'
import mongoose from 'mongoose'

@injectable()
class TokenRepository implements ITokenRepository {
  public async saveRefreshToken(
    refreshToken: string,
    userId: mongoose.Types.ObjectId
  ) {
    return tokenModel.create({ refreshToken, userId })
  }
}

export { TokenRepository }
