import { NextFunction, Request, Response } from 'express'
import { IConfigService } from '../config/config.service.interface'
import { HttpError } from '../exceptions/http-error.class'
import { ITokenService } from '../services/token/interfaces/token.service.interface'
import { TYPES } from '../types'
import { IMiddleware } from './middleware.interface'
import { container } from '../inversify.config'

class AuthMiddleware implements IMiddleware {
  private configService = container.get<IConfigService>(TYPES.ConfigService)
  private tokenService = container.get<ITokenService>(TYPES.TokenService)

  public async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization

      if (!authorizationHeader) {
        throw new Error('Not authorized')
      }

      const accessToken = authorizationHeader.split(' ')[1]

      if (!accessToken) {
        throw new Error('Not authorized')
      }

      const dataFromToken = await this.tokenService.validateToken(
        accessToken,
        this.configService.get('JWT_ACCESS_SECRET')
      )

      req.user = dataFromToken

      next()
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(401, err.message))
      }
    }
  }
}

export { AuthMiddleware }
