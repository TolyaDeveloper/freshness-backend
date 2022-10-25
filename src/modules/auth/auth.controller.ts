import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../../common/base.controller'
import {
  IAuthController,
  IActivateParams
} from './interfaces/auth.controller.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { LoginDto } from './dto/login.dto'
import { SignupDto } from './dto/signup.dto'
import { TYPES } from '../../types'
import { IAuthService } from './interfaces/auth.service.interface'
import { HttpError } from '../../exceptions/http-error.class'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { IConfigService } from '../../config/config.service.interface'
import { MulterMiddleware } from '../../common/multer.middleware'

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
        middlewares: [
          new ValidateMiddleware(SignupDto)
          // new MulterMiddleware('avatarUri')
        ]
      },
      {
        method: 'post',
        path: '/auth/login',
        func: this.login,
        middlewares: [new ValidateMiddleware(LoginDto)]
      },
      { method: 'post', path: '/auth/logout', func: this.logout },
      { method: 'get', path: '/auth/activate/:id', func: this.activate },
      { method: 'get', path: '/auth/refresh', func: this.refresh }
    ])
  }

  public async signup(
    req: Request<{}, {}, SignupDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.authService.signup({
        ...req.body,
        avatarUri: req.file?.filename
      })

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: Number(this.configService.get('COOKIES_JWT_REFRESH_EXPIRES_IN'))
      })

      res.json({ accessToken: result.accessToken, user: result.user })
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

      res.json({ accessToken: result.accessToken, user: result.user })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(401, err.message))
      }
    }
  }

  public async activate(
    req: Request<IActivateParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.authService.activate(req.params.id)

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

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.cookies
      const result = await this.authService.refresh(refreshToken)

      res.cookie('refreshToken', result.refreshToken, {
        maxAge: Number(
          this.configService.get('COOKIES_JWT_REFRESH_EXPIRES_IN')
        ),
        httpOnly: true
      })

      res.json({ accessToken: result.accessToken, user: result.user })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(401, err.message))
      }
    }
  }
}

export { AuthController }
