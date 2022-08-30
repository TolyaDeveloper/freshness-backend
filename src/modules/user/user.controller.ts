import { inject, injectable } from 'inversify'
import { Request, Response, NextFunction } from 'express'
import { BaseController } from '../../common/base.controller'
import { ILoggerService } from '../../logger/logger.service.interface'
import { IUserController } from './interfaces/user.controller.interface'
import { TYPES } from '../../types'
import { IUserService } from './interfaces/user.service.interface'
import { HttpError } from '../../exceptions/http-error.class'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { ValidateMiddleware } from '../../common/validate.middleware'

@injectable()
class UserController extends BaseController implements IUserController {
  @inject(TYPES.UserService) private userService: IUserService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      {
        method: 'get',
        path: '/customers-reviews',
        func: this.findCustomersReviews
      },
      {
        method: 'post',
        path: '/customers-reviews/add',
        func: this.addCustomerReview,
        middlewares: [new ValidateMiddleware(CustomerReviewDto)]
      },
      {
        method: 'get',
        path: '/cart',
        func: this.findAllCart
      }
    ])
  }

  public async findCustomersReviews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const customersReviews = await this.userService.findCustomersReviews()

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

  public async findAllCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cartProducts = await this.userService.findAllCart(
        req.query.productIds as unknown as string[]
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
