import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { App } from './app'
import { Database } from './database/database.service'
import { IDatabaseService } from './database/database.service.interface'
import { LoggerService } from './logger/logger.service'
import { ILoggerService } from './logger/logger.service.interface'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { ExceptionFilter } from './exceptions/exception.filter'
import { IExceptionFilter } from './exceptions/exception.filter.interface'
import { AuthController } from './modules/auth/auth.controller'
import { IAuthController } from './modules/auth/interfaces/auth.controller.interface'
import { AuthRepository } from './modules/auth/auth.repository'
import { IAuthRepository } from './modules/auth/interfaces/auth.repository.interface'
import { AuthService } from './modules/auth/auth.service'
import { IAuthService } from './modules/auth/interfaces/auth.service.interface'
import { CategoriesController } from './modules/categories/categories.controller'
import { ICategoriesController } from './modules/categories/interfaces/categories.controller.interface'
import { CategoriesRepository } from './modules/categories/categories.repository'
import { ICategoriesRepository } from './modules/categories/interfaces/categories.repository.interface'
import { CategoriesService } from './modules/categories/categories.service'
import { ICategoriesService } from './modules/categories/interfaces/categories.service.interface'
import { TokenService } from './services/token/token.service'
import { ITokenService } from './services/token/interfaces/token.service.interface'
import { TokenRepository } from './services/token/token.repository'
import { ITokenRepository } from './services/token/interfaces/token.repository.interface'
import { MailService } from './services/mail/mail.service'
import { IMailService } from './services/mail/interfaces/mail.service.inerface'
import { UserController } from './modules/user/user.controller'
import { IUserController } from './modules/user/interfaces/user.controller.interface'
import { UserRepository } from './modules/user/user.repository'
import { IUserRepository } from './modules/user/interfaces/user.repository.interface'
import { UserService } from './modules/user/user.service'
import { IUserService } from './modules/user/interfaces/user.service.interface'

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.App).to(App)
  bind<IDatabaseService>(TYPES.Database).to(Database)
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope()
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
  bind<ICategoriesController>(TYPES.CategoriesController).to(
    CategoriesController
  )
  bind<ICategoriesRepository>(TYPES.CategoriesRepository).to(
    CategoriesRepository
  )
  bind<ICategoriesService>(TYPES.CategoriesService).to(CategoriesService)

  bind<IAuthController>(TYPES.AuthController).to(AuthController)
  bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository)
  bind<IAuthService>(TYPES.AuthService).to(AuthService)
  bind<ITokenService>(TYPES.TokenService).to(TokenService).inSingletonScope()
  bind<ITokenRepository>(TYPES.TokenRepository)
    .to(TokenRepository)
    .inSingletonScope()
  bind<IMailService>(TYPES.MailService).to(MailService)

  bind<IUserController>(TYPES.UserController).to(UserController)
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
  bind<IUserService>(TYPES.UserService).to(UserService)
})

const container = new Container()

container.load(bindings)

export { container }
