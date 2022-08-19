import { inject, injectable } from 'inversify'
import {
  Algorithm,
  GetPublicKeyOrSecret,
  Secret,
  sign,
  verify
} from 'jsonwebtoken'
import { TYPES } from '../../types'
import { HttpError } from '../../exceptions/http-error.class'
import { IConfigService } from '../../config/config.service.interface'
import { ITokenService } from './interfaces/token.service.interface'
import { ITokenRepository } from './interfaces/token.repository.interface'
import { ITokenPayload, ITokens } from '../../interfaces/token.interface'
import { type TokenModelType } from '../../models/token.model'
import mongoose from 'mongoose'

@injectable()
class TokenService implements ITokenService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TokenRepository) private tokenRepository: ITokenRepository
  ) {}

  public generateAccessAndRefreshTokens(payload: ITokenPayload): ITokens {
    const accessToken = sign(
      payload,
      this.configService.get('JWT_ACCESS_SECRET'),
      {
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        algorithm: this.configService.get('JWT_ACCESS_ALGORITHM') as Algorithm
      }
    )

    const refreshToken = sign(
      payload,
      this.configService.get('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        algorithm: this.configService.get('JWT_REFRESH_ALGORITHM') as Algorithm
      }
    )

    return { accessToken, refreshToken }
  }

  public validateToken(
    token: string,
    secret: Secret | GetPublicKeyOrSecret
  ): Promise<ITokenPayload> {
    return new Promise((resolve, reject) => {
      verify(token, secret, (err, decodedData) => {
        if (err) {
          reject(err)
        }

        resolve(decodedData as ITokenPayload)
      })
    })
  }

  public async saveRefreshToken(
    refreshToken: string,
    userId: mongoose.Types.ObjectId
  ): Promise<TokenModelType> {
    const result = await this.tokenRepository.findRefreshTokenByUserId(userId)

    if (result) {
      result.refreshToken = refreshToken

      return await result.save()
    }

    const token = await this.tokenRepository.saveRefreshToken(
      refreshToken,
      userId
    )

    return token
  }

  public async removeRefreshToken(refreshToken: string) {
    const result = await this.tokenRepository.removeRefreshToken(refreshToken)

    if (!result) {
      throw HttpError.SESSION_DOES_NOT_EXIST()
    }
  }

  public async findRefreshToken(refreshToken: string) {
    const token = await this.tokenRepository.findRefreshToken(refreshToken)

    return token
  }
}

export { TokenService }
