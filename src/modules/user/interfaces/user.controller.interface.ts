import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import { UpdateProfileDto, AddToWishlistDto } from '../dto/update-profile.dto'
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
  findProductsByIds(
    req: Request<{}, {}, {}, IFindCartGoodsQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  updateProfile(
    req: Request<{}, {}, UpdateProfileDto>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addToWishlist(
    req: Request<{}, {}, AddToWishlistDto>,
    res: Response,
    next: NextFunction
  ): Promise<void>
}
