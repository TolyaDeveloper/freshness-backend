import { inject, injectable } from 'inversify'
import { Request, Response, NextFunction } from 'express'
import { TYPES } from '../../types'
import { BaseController } from '../../common/base.controller'
import { ILoggerService } from '../../logger/logger.service.interface'
import {
  IUserController,
  IFindCartGoodsQueries
} from './interfaces/user.controller.interface'
import { IUserService } from './interfaces/user.service.interface'
import { HttpError } from '../../exceptions/http-error.class'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { RoleMiddleware } from '../../common/role.middleware'
import {
  UpdateProfileDto,
  AddToWishlistDto,
  RemoveFromWishlistDto,
  AddToCompareDto,
  RemoveFromCompareDto,
  AddToCartDto,
  RemoveFromCartDto
} from './dto/update-profile.dto'
import { AuthMiddleware } from '../../common/auth.middleware'
import { MulterMiddleware } from '../../common/multer.middleware'

@injectable()
class UserController extends BaseController implements IUserController {
  @inject(TYPES.UserService) private userService: IUserService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      {
        method: 'patch',
        path: '/user/update-profile',
        func: this.updateProfile,
        middlewares: [
          new AuthMiddleware(),
          new MulterMiddleware('avatarUri'),
          new ValidateMiddleware(UpdateProfileDto)
        ]
      },
      {
        method: 'get',
        path: '/customer-reviews',
        func: this.findCustomerReviews
      },
      {
        method: 'post',
        path: '/customer-reviews/add',
        func: this.addCustomerReview,
        middlewares: [
          new RoleMiddleware(['ADMIN']),
          new ValidateMiddleware(CustomerReviewDto)
        ]
      },
      {
        method: 'get',
        path: '/user/products/ids',
        func: this.findProductsByIds
      },
      {
        method: 'patch',
        path: '/user/wishlist/add',
        func: this.addToWishlist,
        middlewares: [
          new AuthMiddleware(),
          new ValidateMiddleware(AddToWishlistDto)
        ]
      },
      {
        method: 'patch',
        path: '/user/wishlist/remove',
        func: this.removeFromWishlist,
        middlewares: [
          new AuthMiddleware(),
          new ValidateMiddleware(RemoveFromWishlistDto)
        ]
      },
      {
        method: 'patch',
        path: '/user/compare/add',
        func: this.addToCompare,
        middlewares: [
          new AuthMiddleware(),
          new ValidateMiddleware(AddToCompareDto)
        ]
      },
      {
        method: 'patch',
        path: '/user/compare/remove',
        func: this.removeFromCompare,
        middlewares: [
          new AuthMiddleware(),
          new ValidateMiddleware(RemoveFromCompareDto)
        ]
      },
      {
        method: 'patch',
        path: '/user/cart/add',
        func: this.addToCart,
        middlewares: [
          new AuthMiddleware(),
          new ValidateMiddleware(AddToCartDto)
        ]
      },
      {
        method: 'patch',
        path: '/user/cart/remove',
        func: this.removeFromCart,
        middlewares: [
          new AuthMiddleware(),
          new ValidateMiddleware(RemoveFromCartDto)
        ]
      }
    ])
  }

  public async updateProfile(
    req: Request<{}, {}, UpdateProfileDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedUser = await this.userService.updateProfile(
        { ...req.body, avatarUri: req.file?.filename },
        req.user._id
      )

      if (!updatedUser) {
        throw HttpError.NotFound()
      }

      res.json(updatedUser)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async findCustomerReviews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const customersReviews = await this.userService.findCustomerReviews()

      res.json(customersReviews)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async addCustomerReview(
    req: Request<{}, {}, CustomerReviewDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.userService.addCustomerReview(req.body)

      res.json({ message: 'New customer review created!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async findProductsByIds(
    req: Request<{}, {}, {}, IFindCartGoodsQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cartProducts = await this.userService.findProductsByIds(
        req.query.productIds
      )

      res.json(cartProducts)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async addToWishlist(
    req: Request<{}, {}, AddToWishlistDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedWishlist = await this.userService.addToWishlist(
        req.body.productId,
        req.user._id
      )

      if (!updatedWishlist) {
        throw HttpError.NotFound()
      }

      res.json(updatedWishlist)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async removeFromWishlist(
    req: Request<{}, {}, RemoveFromWishlistDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedWishlist = await this.userService.removeFromWishlist(
        req.body.productId,
        req.user._id
      )

      if (!updatedWishlist) {
        throw HttpError.NotFound()
      }

      res.json(updatedWishlist)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async addToCompare(
    req: Request<{}, {}, AddToCompareDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedCompare = await this.userService.addToCompare(
        req.body.productId,
        req.user._id
      )

      if (!updatedCompare) {
        throw HttpError.NotFound()
      }

      res.json(updatedCompare)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async removeFromCompare(
    req: Request<{}, {}, RemoveFromCompareDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedCompare = await this.userService.removeFromCompare(
        req.body.productId,
        req.user._id
      )

      if (!updatedCompare) {
        throw HttpError.NotFound()
      }

      res.json(updatedCompare)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async addToCart(
    req: Request<{}, {}, AddToCartDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedCart = await this.userService.addToCart(
        req.body,
        req.user._id
      )

      if (!updatedCart) {
        throw HttpError.NotFound()
      }

      res.json(updatedCart)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async removeFromCart(
    req: Request<{}, {}, RemoveFromCartDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedCart = await this.userService.removeFromCart(
        req.body.productId,
        req.user._id
      )

      if (!updatedCart) {
        throw HttpError.NotFound()
      }

      res.json(updatedCart)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }
}

export { UserController }
