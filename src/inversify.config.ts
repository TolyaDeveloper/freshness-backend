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
import { ShopController } from './modules/shop/shop.controller'
import { IShopController } from './modules/shop/interfaces/shop.controller.interface'
import { ShopRepository } from './modules/shop/shop.repository'
import { IShopRepository } from './modules/shop/interfaces/shop.repository.interface'
import { ShopService } from './modules/shop/shop.service'
import { IShopService } from './modules/shop/interfaces/shop.service.interface'
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
import { BlogController } from './modules/blog/blog.controller'
import { IBlogController } from './modules/blog/interfaces/blog.controller.interface'
import { BlogRepository } from './modules/blog/blog.repository'
import { IBlogRepository } from './modules/blog/interfaces/blog.repository.interface'
import { BlogService } from './modules/blog/blog.service'
import { IBlogService } from './modules/blog/interfaces/blog.service.interface'

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.App).to(App)
  bind<IDatabaseService>(TYPES.Database).to(Database)
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope()
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
  bind<IShopController>(TYPES.ShopController).to(ShopController)
  bind<IShopRepository>(TYPES.ShopRepository).to(ShopRepository)
  bind<IShopService>(TYPES.ShopService).to(ShopService)
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
  bind<IBlogController>(TYPES.BlogController).to(BlogController)
  bind<IBlogRepository>(TYPES.BlogRepository).to(BlogRepository)
  bind<IBlogService>(TYPES.BlogService).to(BlogService)
})

const container = new Container()

container.load(bindings)

export { container }
