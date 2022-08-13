import { inject, injectable } from 'inversify'
import { Algorithm, sign, verify } from 'jsonwebtoken'
import { TYPES } from '../../types'
import { ITokenService } from './interfaces/token.service.interface'
import { ITokenRepository } from './interfaces/token.repository.interface'
import { ITokenPayload, ITokens } from '../../interfaces/token.interface'
import { IConfigService } from '../../config/config.service.interface'
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

  public validateAccessToken(accessToken: string): Promise<ITokenPayload> {
    return new Promise((resolve, reject) => {
      verify(
        accessToken,
        this.configService.get('JWT_ACCESS_SECRET'),
        (err, decodedData) => {
          if (err) {
            return reject(err)
          }

          resolve(decodedData as ITokenPayload)
        }
      )
    })
  }

  public validateRefreshToken(refreshToken: string): Promise<ITokenPayload> {
    return new Promise((resolve, reject) => {
      verify(
        refreshToken,
        this.configService.get('JWT_REFRESH_SECRET'),
        (err, decodedData) => {
          if (err) {
            return reject(err)
          }

          resolve(decodedData as ITokenPayload)
        }
      )
    })
  }

  public async saveRefreshToken(
    refreshToken: string,
    userId: mongoose.Schema.Types.ObjectId
  ): Promise<string> {
    const result = await this.tokenRepository.saveRefreshToken(
      refreshToken,
      userId
    )

    return result.refreshToken
  }
}

export { TokenService }
