import { ICategoriesController } from './interfaces/categories.controller.interface'
import { BaseController } from '../../common/base.controller'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ICategoriesService } from './interfaces/categories.service.interface'
import { HttpError } from '../../exceptions/http-error.class'
import { ILoggerService } from '../../logger/logger.service.interface'

@injectable()
class CategoriesController
  extends BaseController
  implements ICategoriesController
{
  @inject(TYPES.CategoriesService)
  private categoriesService: ICategoriesService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      { method: 'get', path: '/categories', func: this.getCategories }
    ])
  }

  public async getCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this.categoriesService.getAllCategories()

      res.json(categories)
    } catch (err) {
      next(
        new HttpError(
          404,
          'Could not get categories! Service might be unavailable'
        )
      )
    }
  }
}

export { CategoriesController }
