import { injectable } from 'inversify'
import { BaseController } from '../../common/base.controller'
import { ILoggerService } from '../../logger/logger.service.interface'
import { IUserController } from './interfaces/user.controller.interface'

@injectable()
class UserController extends BaseController implements IUserController {
  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([])
  }
}

export { UserController }
