import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import { UpdateProfileDto } from '../dto/update-profile.dto'
import mongoose from 'mongoose'

export interface IFindCartGoodsQueries {
  productIds: mongoose.Types.ObjectId[]
}

export interface IUserController extends BaseController {
  updateProfile(
    req: Request<{}, {}, UpdateProfileDto>,
    res: Response,
    next: NextFunction
  ): Promise<void>
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
