import express, { Express } from 'express'
import { Server } from 'http'
import { injectable, inject } from 'inversify'
import { TYPES } from './types'
import { IDatabaseService } from './database/database.service.interface'
import { ILoggerService } from './logger/logger.service.interface'
import { IConfigService } from './config/config.service.interface'
import { IExceptionFilter } from './exceptions/exception.filter.interface'
import { IShopController } from './modules/shop/interfaces/shop.controller.interface'
import { IAuthController } from './modules/auth/interfaces/auth.controller.interface'
import { IUserController } from './modules/user/interfaces/user.controller.interface'
import { IBlogController } from './modules/blog/interfaces/blog.controller.interface'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

@injectable()
class App {
  public port: number
  public app: Express
  public server: Server

  constructor(
    @inject(TYPES.Database) private database: IDatabaseService,
    @inject(TYPES.LoggerService) private logger: ILoggerService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ShopController)
    private shopController: IShopController,
    @inject(TYPES.AuthController) private authController: IAuthController,
    @inject(TYPES.UserController) private userController: IUserController,
    @inject(TYPES.BlogController) private blogController: IBlogController
  ) {
    this.port = Number(this.configService.get('PORT'))
    this.app = express()
  }

  private useMiddlewares(): void {
    this.app.use(
      cors({ origin: this.configService.get('CLIENT_URI'), credentials: true })
    )
    this.app.use(cookieParser())
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  private useControllers(): void {
    this.app.use(this.shopController.router)
    this.app.use(this.authController.router)
    this.app.use(this.userController.router)
    this.app.use(this.blogController.router)
  }

  private useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch)
  }

  public async run(): Promise<void> {
    this.useMiddlewares()
    this.useControllers()
    this.useExceptionFilters()

    await this.database.connect()
    this.server = this.app.listen(this.port, () => {
      this.logger.info(`[Server] Working at ${this.port} port`)
    })
  }

  public close(): void {
    this.server.close()
  }
}

export { App }
