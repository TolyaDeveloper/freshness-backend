import express, { Express } from 'express'
import { Server } from 'http'
import { injectable, inject } from 'inversify'
import { TYPES } from './types'
import { IDatabaseService } from './database/database.service.interface'
import { ILoggerService } from './logger/logger.service.interface'
import { IConfigService } from './config/config.service.interface'
import helmet from 'helmet'

@injectable()
class App {
  public port: number
  public app: Express
  public server: Server

  constructor(
    @inject(TYPES.Database) private database: IDatabaseService,
    @inject(TYPES.LoggerService) private logger: ILoggerService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.port = Number(this.configService.get('PORT'))
    this.app = express()
  }

  private useMiddlewares(): void {
    this.app.use(helmet())
  }

  public async run(): Promise<void> {
    this.useMiddlewares()

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
