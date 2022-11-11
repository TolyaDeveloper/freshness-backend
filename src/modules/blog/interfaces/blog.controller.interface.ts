import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import mongoose from 'mongoose'

export interface IFindByIdParams {
  id: mongoose.Types.ObjectId
}

export interface IBlogPostQueries {
  limit: number
  skip: number
  category: mongoose.Types.ObjectId
  byDate: Date
}

export interface IBlogController extends BaseController {
  findBlogPosts(
    req: Request<{}, {}, {}, IBlogPostQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  findBlogPostById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addBlogPost(req: Request, res: Response, next: NextFunction): Promise<void>
}
