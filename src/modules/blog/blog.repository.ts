import { injectable } from 'inversify'
import { BlogPostDto, IBlogPostQueries } from './dto/blog-post.dto'
import { IBlogRepository } from './interfaces/blog.repository.interface'
import { postModel } from '../../models/post.model'
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
        createdAt: { $gte: startSearchFrom, $lte: endSearchBy }
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
