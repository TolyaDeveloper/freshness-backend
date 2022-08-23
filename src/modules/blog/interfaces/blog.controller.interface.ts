import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import { IBlogPostQueries } from '../dto/blog-post.dto'

export interface IBlogController extends BaseController {
  addBlogPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  findBlogPostById: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  findBlogPosts: (
    req: Request<{}, {}, {}, IBlogPostQueries>,
    res: Response,
    next: NextFunction
  ) => Promise<void>
}
