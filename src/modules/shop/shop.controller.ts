import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { BaseController } from '../../common/base.controller'
import { HttpError } from '../../exceptions/http-error.class'
import {
  IShopController,
  IGatherCategoryFiltersQueries,
  IFindByIdParams,
  IFindProductsQueries,
  IFindCommentsParams,
  IFindReviewsAndQuestionsParams
} from './interfaces/shop.controller.interface'
import { IShopService } from './interfaces/shop.service.interface'
import { ILoggerService } from '../../logger/logger.service.interface'
import { CategoryDto } from './dto/category.dto'
import { TagDto } from './dto/tag.dto'
import { ProductDto } from './dto/product.dto'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { RoleMiddleware } from '../../common/role.middleware'
import { AuthMiddleware } from '../../common/auth.middleware'
import { ProductReviewDto } from './dto/product-review.dto'
import { ParsedQs } from 'qs'

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
        func: this.findCategories
      },
      {
        method: 'get',
        path: '/categories/:id',
        func: this.findCategoryById
      },
      {
        method: 'post',
        path: '/categories/add',
        func: this.addCategory,
        middlewares: [
          new RoleMiddleware(['ADMIN']),
          new ValidateMiddleware(CategoryDto)
        ]
      },
      {
        method: 'get',
        path: '/products',
        func: this.findProducts
      },
      {
        method: 'get',
        path: '/products/filters',
        func: this.gatherCategoryFilters
      },
      {
        method: 'get',
        path: '/products/:id',
        func: this.findProductById
      },
      {
        method: 'get',
        path: '/products/comments/:productId',
        func: this.findProductComments
      },
      {
        method: 'get',
        path: '/products/reviews-questions/count/:productId',
        func: this.findReviewsAndQuestionsCount
      },
      {
        method: 'post',
        path: '/products/add',
        func: this.addProduct,
        middlewares: [
          new RoleMiddleware(['ADMIN']),
          new ValidateMiddleware(ProductDto)
        ]
      },
      {
        method: 'post',
        path: '/products/add/review',
        func: this.addProductReview,
        middlewares: [
          new AuthMiddleware(),
          new ValidateMiddleware(ProductReviewDto)
        ]
      },
      {
        method: 'get',
        path: '/tags',
        func: this.findTags
      },
      {
        method: 'get',
        path: '/tags/:id',
        func: this.findTagById
      },
      {
        method: 'post',
        path: '/tags/add',
        func: this.addTag,
        middlewares: [
          new RoleMiddleware(['ADMIN']),
          new ValidateMiddleware(TagDto)
        ]
      }
    ])
  }

  public async findCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this.shopService.findCategories()

      res.json(categories)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async findCategoryById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const category = await this.shopService.findCategoryById(req.params.id)

      if (!category) {
        throw HttpError.NotFound()
      }

      res.json(category)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async addCategory(
    req: Request<{}, {}, CategoryDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.shopService.addCategory(req.body)

      res.json({ message: 'New category has been created!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async findProducts(
    req: Request<{}, {}, {}, IFindProductsQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { limit = 9, skip = 0, ...rest } = req.query

      const products = await this.shopService.findProducts({
        limit,
        skip,
        ...rest
      })

      res.json(products)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async gatherCategoryFilters(
    { query }: Request<{}, {}, {}, IGatherCategoryFiltersQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.shopService.gatherCategoryFilters(query)

      res.json(result)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async findProductById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await this.shopService.findProductById(req.params.id)

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

  public async findProductComments(
    req: Request<IFindCommentsParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const comments = await this.shopService.findProductComments(
        req.params.productId
      )

      res.json(comments)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async findReviewsAndQuestionsCount(
    req: Request<IFindReviewsAndQuestionsParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const counts = await this.shopService.findReviewsAndQuestionsCount(
        req.params.productId
      )

      res.json(counts)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async addProduct(
    req: Request<{}, {}, ProductDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.shopService.addProduct(req.body)

      res.json({ message: 'New product has been created!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async addProductReview(
    req: Request<{}, {}, ProductReviewDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.shopService.addProductReview(
        req.body,
        req.user._id
      )

      if (!result) {
        throw HttpError.NotFound()
      }

      res.json({ message: 'Review has been added!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async findTags(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tags = await this.shopService.findTags()

      res.json(tags)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async findTagById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tag = await this.shopService.findTagById(req.params.id)

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

  public async addTag(
    req: Request<{}, {}, TagDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.shopService.addTag(req.body)

      res.json({ message: 'New tag has been created!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }
}

export { ShopController }
