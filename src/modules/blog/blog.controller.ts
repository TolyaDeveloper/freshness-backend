import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../../common/base.controller'
import { ILoggerService } from '../../logger/logger.service.interface'
import {
  IBlogController,
  IBlogPostQueries,
  IFindByIdParams
} from './interfaces/blog.controller.interface'
import { BlogPostDto } from './dto/blog-post.dto'
import { HttpError } from '../../exceptions/http-error.class'
import { TYPES } from '../../types'
import { IBlogService } from './interfaces/blog.service.interface'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { RoleMiddleware } from '../../common/role.middleware'

@injectable()
class BlogController extends BaseController implements IBlogController {
  @inject(TYPES.BlogService) private blogService: IBlogService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      {
        method: 'get',
        path: '/blog-posts',
        func: this.findBlogPosts
      },
      {
        method: 'get',
        path: '/blog-posts/:id',
        func: this.findBlogPostById
      },
      {
        method: 'post',
        path: '/blog-posts/add',
        func: this.addBlogPost,
        middlewares: [
          new RoleMiddleware(['ADMIN']),
          new ValidateMiddleware(BlogPostDto)
        ]
      }
    ])
  }

  public async findBlogPosts(
    req: Request<{}, {}, {}, IBlogPostQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { limit = 9, skip = 0, ...rest } = req.query

      const blogPosts = await this.blogService.findBlogPosts({
        limit,
        skip,
        ...rest
      })

      res.json(blogPosts)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async findBlogPostById(
    req: Request<IFindByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogPost = await this.blogService.findBlogPostById(req.params.id)

      if (!blogPost) {
        throw HttpError.NotFound()
      }

      res.json(blogPost)
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(404, err.message))
      }
    }
  }

  public async addBlogPost(
    req: Request<{}, {}, BlogPostDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.blogService.addBlogPost(req.body, req.user._id)

      res.json({ message: 'Blog post has been added!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }
}

export { BlogController }
