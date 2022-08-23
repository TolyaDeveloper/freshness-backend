import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../../common/base.controller'
import { ILoggerService } from '../../logger/logger.service.interface'
import { IBlogController } from './interfaces/blog.controller.interface'
import { BlogPostDto, IBlogPostQueries } from './dto/blog-post.dto'
import { HttpError } from '../../exceptions/http-error.class'
import { TYPES } from '../../types'
import { IBlogService } from './interfaces/blog.service.interface'
import { ValidateMiddleware } from '../../common/validate.middleware'
import mongoose from 'mongoose'

@injectable()
class BlogController extends BaseController implements IBlogController {
  @inject(TYPES.BlogService) private blogService: IBlogService

  constructor(logger: ILoggerService) {
    super(logger)

    this.bindRoutes([
      {
        method: 'post',
        path: '/blog-posts/add',
        func: this.addBlogPost,
        middlewares: [new ValidateMiddleware(BlogPostDto)]
      },
      {
        method: 'get',
        path: '/blog-posts/:id',
        func: this.findBlogPostById
      },
      {
        method: 'get',
        path: '/blog-posts',
        func: this.findBlogPosts
      }
    ])
  }

  public async addBlogPost(
    req: Request<{}, {}, BlogPostDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.blogService.addBlogPost(req.body)

      res.json({ message: 'Blog post has been added!' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpError(500, err.message))
      }
    }
  }

  public async findBlogPostById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogPost = await this.blogService.findBlogPostById(
        req.params.id as unknown as mongoose.Types.ObjectId
      )

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
}

export { BlogController }
