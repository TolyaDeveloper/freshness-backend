import { injectable } from 'inversify'
import { Logger } from 'tslog'
import { ILoggerService } from './logger.service.interface'

@injectable()
class LoggerService implements ILoggerService {
  public logger: Logger

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: 'hidden',
      displayFunctionName: false
    })
  }

  info(...args: unknown[]): void {
    this.logger.info(...args)
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args)
  }

  error(...args: unknown[]): void {
    this.logger.error(...args)
  }
}

export { LoggerService }
