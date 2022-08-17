import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { ICategoriesController } from './interfaces/categories.controller.interface'
import { BaseController } from '../../common/base.controller'
import { TYPES } from '../../types'
import { ICategoriesService } from './interfaces/categories.service.interface'
import { HttpError } from '../../exceptions/http-error.class'
import { ILoggerService } from '../../logger/logger.service.interface'
import { CategoryDto } from './dto/category.dto'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { AuthMiddleware } from '../../common/auth.middleware'

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
      {
        method: 'get',
        path: '/categories',
        func: this.findAllCategories,
        middlewares: [new AuthMiddleware()]
      },
      {
        method: 'post',
        path: '/categories/add',
        func: this.addCategories,
        middlewares: [new ValidateMiddleware(CategoryDto)]
      }
    ])
  }

  public async findAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this.categoriesService.findAllCategories()

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

  public async addCategories(
    req: Request<{}, {}, CategoryDto[]>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.categoriesService.addCategories(req.body)

      res.json({ message: 'New categories have been saved!' })
    } catch (err) {
      next(new HttpError(500, 'Could not save new categories!'))
    }
  }
}

export { CategoriesController }
