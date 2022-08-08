import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { BaseController } from '../../common/base.controller'
import { IAuthController } from './interfaces/auth.controller.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { LoginDto } from './dto/login.dto'
import { SignupDto } from './dto/signup.dto'

@injectable()
class AuthController extends BaseController implements IAuthController {
  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      { method: 'post', path: '/auth/signup', func: this.signup },
      { method: 'post', path: '/auth/login', func: this.login }
    ])
  }

  public async signup(
    req: Request<{}, {}, SignupDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  public async login(
    req: Request<{}, {}, LoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}

export { AuthController }
