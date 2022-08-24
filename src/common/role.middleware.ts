import { NextFunction, Request, Response } from 'express'
import { IConfigService } from '../config/config.service.interface'
import { HttpError } from '../exceptions/http-error.class'
import { container } from '../inversify.config'
import { ITokenService } from '../services/token/interfaces/token.service.interface'
import { TYPES } from '../types'
import { IMiddleware } from './middleware.interface'

class RoleMiddleware implements IMiddleware {
  // ? refactor
  private configService = container.get<IConfigService>(TYPES.ConfigService)
  private tokenService = container.get<ITokenService>(TYPES.TokenService)

  constructor(private roles: string[]) {}

  public async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization

      if (!authorizationHeader) {
        throw HttpError.Unathorized()
      }

      const accessToken = authorizationHeader.split(' ')[1]

      if (!accessToken) {
        throw HttpError.Unathorized()
      }

      const { roles: userRoles } = await this.tokenService.validateToken(
        accessToken,
        this.configService.get('JWT_ACCESS_SECRET')
      )

      let hasRole = false

      userRoles.forEach(userRole => {
        if (this.roles.includes(userRole)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        // ? fix: status code should be 403
        throw HttpError.Forbidden()
      }

      next()
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(401, err.message))
      }
    }
  }
}

export { RoleMiddleware }
