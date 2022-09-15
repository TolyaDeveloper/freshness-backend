import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import mongoose from 'mongoose'

export interface IFindCartGoodsQueries {
  productIds: mongoose.Types.ObjectId[]
}

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
  findCartGoods(
    req: Request<{}, {}, {}, IFindCartGoodsQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void>
}
