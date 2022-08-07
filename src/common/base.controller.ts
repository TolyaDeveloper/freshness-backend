import { Router } from 'express'
import { injectable, inject } from 'inversify'
import { ILoggerService } from '../logger/logger.service.interface'
import { TYPES } from '../types'
import { IRoute } from './route.interface'

@injectable()
abstract class BaseController {
  private readonly _router: Router

  constructor(@inject(TYPES.LoggerService) protected logger: ILoggerService) {
    this._router = Router()
  }

  get router(): Router {
    return this._router
  }

  protected bindRoutes(routes: IRoute[]): void {
    routes.forEach(({ method, path, middlewares, func }) => {
      const middleware = middlewares?.map(m => m.execute.bind(m))
      const handler = func.bind(this)
      const pipeline = middleware ? [...middleware, handler] : handler

      this.logger.info(`[Controller] [${method}] -> ${path} created`)
      this.router[method](path, pipeline)
    })
  }
}

export { BaseController }
