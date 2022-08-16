import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../../common/base.controller'
import { IAuthController } from './interfaces/auth.controller.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { LoginDto } from './dto/login.dto'
import { SignupDto } from './dto/signup.dto'
import { TYPES } from '../../types'
import { IAuthService } from './interfaces/auth.service.interface'
import { HttpError } from '../../exceptions/http-error.class'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { ITokenService } from '../../services/token/interfaces/token.service.interface'
import { IConfigService } from '../../config/config.service.interface'

@injectable()
class AuthController extends BaseController implements IAuthController {
  @inject(TYPES.AuthService) private authService: IAuthService
  @inject(TYPES.ConfigService) private configService: IConfigService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      {
        method: 'post',
        path: '/auth/signup',
        func: this.signup,
        middlewares: [new ValidateMiddleware(SignupDto)]
      },
      {
        method: 'post',
        path: '/auth/login',
        func: this.login,
        middlewares: [new ValidateMiddleware(LoginDto)]
      },
      { method: 'get', path: '/auth/activate/:link', func: this.activate },
      { method: 'post', path: '/auth/logout', func: this.logout }
    ])
  }

  public async signup(
    req: Request<{}, {}, SignupDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.authService.signup(req.body)

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: Number(this.configService.get('COOKIES_JWT_REFRESH_EXPIRES_IN'))
      })
      res.json({ accessToken: result.accessToken })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(409, err.message))
      }
    }
  }

  public async login(
    req: Request<{}, {}, LoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.authService.login(req.body)

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: Number(this.configService.get('COOKIES_JWT_REFRESH_EXPIRES_IN'))
      })
      res.json({ accessToken: result.accessToken })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(401, err.message))
      }
    }
  }

  public async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.authService.activate(req.params.link)

      res.send('Account activated successfully!')
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(409, err.message))
      }
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.cookies

      await this.authService.logout(refreshToken)

      res.clearCookie('refreshToken')
      res.end()
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(401, err.message))
      }
    }
  }
}

export { AuthController }
