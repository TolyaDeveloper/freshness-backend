import { NextFunction, Request, Response } from 'express'
import { inject } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { HttpError } from '../exceptions/http-error.class'
import { ITokenService } from '../services/token/interfaces/token.service.interface'
import { TYPES } from '../types'
import { IMiddleware } from './middleware.interface'

class AuthMiddleware implements IMiddleware {
  constructor(
    @inject(TYPES.TokenService) private tokenService: ITokenService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}

  public execute(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization

      if (!authorizationHeader) {
        throw new Error('Not authorized')
      }

      const accessToken = authorizationHeader.split(' ')[1]

      if (!accessToken) {
        throw new Error('Not authorized')
      }

      this.tokenService
        .validateToken(accessToken, this.configService.get('JWT_ACCESS_SECRET'))
        .then(dataFromToken => {
          if (!dataFromToken) {
            throw new Error('Not authorized')
          }

          // !todo req.user = dataFromToken

          next()
        })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(401, err.message))
      }
    }
  }
}

export { AuthMiddleware }
