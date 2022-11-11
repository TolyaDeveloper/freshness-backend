import { injectable } from 'inversify'
import { BlogPostDto } from './dto/blog-post.dto'
import { IBlogPostQueries } from './interfaces/blog.controller.interface'
import { IBlogRepository } from './interfaces/blog.repository.interface'
import { postModel } from '../../models/post.model'
import { handleQueryObject } from '../../utils/handleQueryObject'
import mongoose from 'mongoose'

@injectable()
class BlogRepository implements IBlogRepository {
  public async findBlogPosts(
    { limit, skip, ...rest }: IBlogPostQueries,
    startSearchFrom: Date | undefined,
    endSearchBy: Date | undefined
  ) {
    return postModel
      .find({
        categories: rest.category,
        createdAt: handleQueryObject({
          $gte: startSearchFrom,
          $lte: endSearchBy
        })
      })
      .limit(limit)
      .skip(skip)
      .lean()
      .populate('tags')
      .populate('createdBy', 'avatarUri firstName')
  }

  public async findBlogPostById(id: mongoose.Types.ObjectId) {
    return postModel.findById(id).lean()
  }

  public async addBlogPost(blogPost: BlogPostDto) {
    return postModel.create(blogPost)
  }
}

export { BlogRepository }
