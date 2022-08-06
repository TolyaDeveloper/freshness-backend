import { Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'
import { TYPES } from '../types'
import { ILoggerService } from '../logger/logger.service.interface'
import { IExceptionFilter } from './exception.filter.interface'
import { HttpError } from './http-error.class'

@injectable()
class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {}

  catch = (
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err instanceof HttpError) {
      this.logger.error(`[Exception] Error ${err.statusCode} : ${err.message}`)
      res
        .status(err.statusCode)
        .json({ statusCode: err.statusCode, message: err.message })
    } else {
      this.logger.error(`[Exception] ${err.message}`)
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  }
}

export { ExceptionFilter }
