import { injectable, inject } from 'inversify'
import { TYPES } from '../types'
import { ILoggerService } from '../logger/logger.service.interface'
import { IConfigService } from '../config/config.service.interface'
import { IDatabaseService } from './database.service.interface'
import mongoose from 'mongoose'

@injectable()
class Database implements IDatabaseService {
  constructor(
    @inject(TYPES.LoggerService) private logger: ILoggerService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(
        this.configService.get('DATABASE_URI_DEVELOPMENT'),
        { ignoreUndefined: true }
      )

      this.logger.info('[Database] Connected successfully')
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message)
      }
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()

      this.logger.info('[Database] Disconnected successfully')
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message)
      }
    }
  }
}

export { Database }
