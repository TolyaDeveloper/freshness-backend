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

  public async removeRefreshToken(refreshToken: string) {
    return tokenModel.findOneAndDelete({ refreshToken })
  }

  public async findRefreshTokenByUserId(userId: mongoose.Types.ObjectId) {
    return tokenModel.findOne({ userId })
  }

  public async findRefreshToken(refreshToken: string) {
    return tokenModel.findOne({ refreshToken })
  }
}

export { TokenRepository }
