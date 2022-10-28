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
import { UpdateProfileDto, AddToWishlistDto } from './dto/update-profile.dto'
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
}

export { UserController }
