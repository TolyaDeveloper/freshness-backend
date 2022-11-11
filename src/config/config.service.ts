import { injectable, inject } from 'inversify'
import { config, DotenvParseOutput, DotenvConfigOutput } from 'dotenv'
import { TYPES } from '../types'
import { ILoggerService } from '../logger/logger.service.interface'
import { IConfigService } from './config.service.interface'

@injectable()
class ConfigService implements IConfigService {
  private config: DotenvParseOutput

  constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {
    const result: DotenvConfigOutput = config()

    if (result.error) {
      this.logger.error('[ConfigService] Failed to load environment variables')
    } else {
      this.logger.info(
        '[ConfigService] Environment variables loaded successfully'
      )
      this.config = result.parsed as DotenvParseOutput
    }
  }

  public get(key: string): string {
    return this.config[key]
  }
}

export { ConfigService }
