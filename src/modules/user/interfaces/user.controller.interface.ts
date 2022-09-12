import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'

export interface IUserController extends BaseController {
  findCustomerReviews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addCustomerReview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>
  findCartGoods(req: Request, res: Response, next: NextFunction): Promise<void>
}
