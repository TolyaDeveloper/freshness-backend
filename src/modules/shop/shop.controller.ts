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
        method: 'post',
        path: '/product/add',
        func: this.addProduct,
        middlewares: [new ValidateMiddleware(ProductDto)]
      },
      {
        method: 'get',
        path: '/product/:id',
        func: this.findProductById
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

      res.json({ message: 'New product have been saved!' })
    } catch (err) {
      next(new HttpError(500, 'Could not save new product!'))
    }
  }

  public async findProductById(
    req: Request<any, {}, ProductDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await this.shopService.getProductById(req.params.id)

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
}

export { ShopController }
