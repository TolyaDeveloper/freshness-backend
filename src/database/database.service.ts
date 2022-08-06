import { injectable, inject } from 'inversify'
import { TYPES } from '../types'
import { ILoggerService } from '../logger/logger.service.interface'
import mongoose from 'mongoose'

@injectable()
class Database {
  constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {}

  public async connect(): Promise<void> {
    try {
      await mongoose.connect('mongodb://localhost:27017/freshness')

      this.logger.info('Connected to the database!')
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message)
      }
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()

      this.logger.info('Disconnected from the database!')
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message)
      }
    }
  }
}

export { Database }
