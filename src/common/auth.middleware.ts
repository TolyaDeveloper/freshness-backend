import { NextFunction, Request, Response } from 'express'
import { IConfigService } from '../config/config.service.interface'
import { HttpError } from '../exceptions/http-error.class'
import { ITokenService } from '../services/token/interfaces/token.service.interface'
import { TYPES } from '../types'
import { IMiddleware } from './middleware.interface'
import { container } from '../inversify.config'
// import { inject } from 'inversify'
// import { ILoggerService } from '../logger/logger.service.interface'

class AuthMiddleware implements IMiddleware {
  // ? refactor
  private configService = container.get<IConfigService>(TYPES.ConfigService)
  private tokenService = container.get<ITokenService>(TYPES.TokenService)

  // @inject(TYPES.LoggerService) private logger: ILoggerService

  public async execute(req: Request, res: Response, next: NextFunction) {
    // console.log(this.logger) // ? -> undefined

    try {
      const authorizationHeader = req.headers.authorization

      if (!authorizationHeader) {
        throw HttpError.Unathorized()
      }

      const accessToken = authorizationHeader.split(' ')[1]

      if (!accessToken) {
        throw HttpError.Unathorized()
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
