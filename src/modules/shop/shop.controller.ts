import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { BaseController } from '../../common/base.controller'
import { HttpError } from '../../exceptions/http-error.class'
import { IShopController } from './interfaces/shop.controller.interface'
import { IShopService } from './interfaces/shop.service.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { CategoryDto } from './dto/category.dto'
import { ProductDto } from './dto/product.dto'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { AuthMiddleware } from '../../common/auth.middleware'
import mongoose from 'mongoose'
import { TagDto } from './dto/tag.dto'

@injectable()
class ShopController extends BaseController implements IShopController {
  @inject(TYPES.ShopService)
  private shopService: IShopService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      {
        method: 'get',
        path: '/categories',
        func: this.findAllCategories
      },
      {
        method: 'post',
        path: '/categories/add',
        func: this.addCategories,
        middlewares: [new AuthMiddleware(), new ValidateMiddleware(CategoryDto)]
      },
      {
        method: 'get',
        path: '/product/:id',
        func: this.findProductById
      },
      {
        method: 'post',
        path: '/product/add',
        func: this.addProduct,
        middlewares: [new ValidateMiddleware(ProductDto)]
      },
      {
        method: 'get',
        path: '/tag/:id',
        func: this.findTagById
      },
      {
        method: 'post',
        path: '/tags/add',
        func: this.addTags,
        middlewares: [new ValidateMiddleware(TagDto)]
      }
    ])
  }

  public async findAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this.shopService.findAllCategories()

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
      await this.shopService.addCategories(req.body)

      res.json({ message: 'New categories have been saved!' })
    } catch (err) {
      next(new HttpError(500, 'Could not save new categories!'))
    }
  }

  public async addProduct(
    req: Request<{}, {}, ProductDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.shopService.addProduct(req.body)

      res.json({ message: 'New product has been saved!' })
    } catch (err) {
      next(new HttpError(500, 'Could not save new product!'))
    }
  }

  public async findProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await this.shopService.findProductById(
        req.params.id as unknown as mongoose.Types.ObjectId
      )

      if (!product) {
        throw HttpError.NotFound()
      }

      res.json(product)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async findTagById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tag = await this.shopService.findTagById(
        req.params.id as unknown as mongoose.Types.ObjectId
      )

      if (!tag) {
        throw HttpError.NotFound()
      }

      res.json(tag)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async addTags(
    req: Request<{}, {}, TagDto[]>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tags = await this.shopService.addTags(req.body)

      res.json({ message: 'New tags created!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }
}

export { ShopController }
