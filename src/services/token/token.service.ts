import { inject, injectable } from 'inversify'
import { sign, verify } from 'jsonwebtoken'
import { IConfigService } from '../../config/config.service.interface'
import { TYPES } from '../../types'
import { ITokenService } from './interfaces/token.service.interface'
import { ITokenPayload } from '../../interfaces/token.payload.interface'
import mongoose from 'mongoose'
import { ITokenRepository } from './interfaces/token.repository.interface'

@injectable()
class TokenService implements ITokenService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TokenRepository) private tokenRepository: ITokenRepository
  ) {}

  public signAccessToken(payload: ITokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        payload,
        this.configService.get('JWT_ACCESS_SECRET'),
        {
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN')
        },
        (err, token) => {
          if (err) {
            reject(err.message)
          }

          resolve(token as string)
        }
      )
    })
  }

  public signRefreshToken(payload: ITokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        payload,
        this.configService.get('JWT_REFRESH_SECRET'),
        {
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN')
        },
        (err, token) => {
          if (err) {
            reject(err.message)
          }

          resolve(token as string)
        }
      )
    })
  }

  public validateAccessToken(accessToken: string): Promise<ITokenPayload> {
    return new Promise((resolve, reject) => {
      verify(
        accessToken,
        this.configService.get('JWT_ACCESS_SECRET'),
        (err, decoded) => {
          if (err) {
            reject(err)
          }

          resolve(decoded as ITokenPayload)
        }
      )
    })
  }

  public validateRefreshToken(refreshToken: string): Promise<ITokenPayload> {
    return new Promise((resolve, reject) => {
      verify(
        refreshToken,
        this.configService.get('JWT_REFRESH_SECRET'),
        (err, decoded) => {
          if (err) {
            reject(err)
          }

          resolve(decoded as ITokenPayload)
        }
      )
    })
  }

  public async saveRefreshToken(
    refreshToken: string,
    userId: typeof mongoose.Schema.Types.ObjectId
  ): Promise<string> {
    const result = await this.tokenRepository.saveRefreshToken(
      refreshToken,
      userId
    )

    return result.refreshToken
  }
}

export { TokenService }
