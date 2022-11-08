import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import mongoose from 'mongoose'

export interface IFindByIdParams {
  id: mongoose.Types.ObjectId
}

export interface IFindCommentsParams {
  productId: mongoose.Types.ObjectId
}

export interface IFindReviewsAndQuestionsParams {
  productId: mongoose.Types.ObjectId
}

export interface IGatherCategoryFiltersQueries {
  category: mongoose.Types.ObjectId
}

export interface IFindProductsQueries {
  limit: number
  skip: number
  page: number
  category: mongoose.Types.ObjectId
  tag: mongoose.Types.ObjectId
  priceType: string
  biology: string[]
  country: string[]
  rating: string[]
  minPrice: number[]
  maxPrice: number[]
}

export interface IShopController extends BaseController {
  findCategories(req: Request, res: Response, next: NextFunction): Promise<void>
  findCategoryById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addCategory(req: Request, res: Response, next: NextFunction): Promise<void>
  findProducts(
    req: Request<{}, {}, {}, IFindProductsQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  gatherCategoryFilters(
    req: Request<{}, {}, {}, IGatherCategoryFiltersQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  findProductById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  findProductComments(
    req: Request<IFindCommentsParams>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  findReviewsAndQuestionsCount(
    req: Request<IFindReviewsAndQuestionsParams>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addProduct(req: Request, res: Response, next: NextFunction): Promise<void>
  addProductReview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>
  findTags(req: Request, res: Response, next: NextFunction): Promise<void>
  findTagById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addTag(req: Request, res: Response, next: NextFunction): Promise<void>
}
