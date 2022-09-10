import { inject, injectable } from 'inversify'
import { Request, Response, NextFunction } from 'express'
import { TYPES } from '../../types'
import { BaseController } from '../../common/base.controller'
import { ILoggerService } from '../../logger/logger.service.interface'
import { IUserController } from './interfaces/user.controller.interface'
import { IUserService } from './interfaces/user.service.interface'
import { HttpError } from '../../exceptions/http-error.class'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { RoleMiddleware } from '../../common/role.middleware'
import mongoose from 'mongoose'

@injectable()
class UserController extends BaseController implements IUserController {
  @inject(TYPES.UserService) private userService: IUserService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
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
        path: '/cart',
        func: this.findCartGoods
      }
    ])
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

  public async findCartGoods(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cartProducts = await this.userService.findCartGoods(
        req.query.productIds as unknown as mongoose.Types.ObjectId[]
      )

      res.json(cartProducts)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }
}

export { UserController }
