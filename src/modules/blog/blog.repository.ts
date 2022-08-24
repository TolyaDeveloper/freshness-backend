import { injectable } from 'inversify'
import { BlogPostDto, IBlogPostQueries } from './dto/blog-post.dto'
import { IBlogRepository } from './interfaces/blog.repository.interface'
import { postModel } from '../../models/post.model'
import mongoose from 'mongoose'

@injectable()
class BlogRepository implements IBlogRepository {
  public async addBlogPost(blogPost: BlogPostDto) {
    return postModel.create(blogPost)
  }

  public async findBlogPostById(id: mongoose.Types.ObjectId) {
    return postModel.findById(id).lean()
  }

  public async findBlogPosts({ limit, skip, ...rest }: IBlogPostQueries) {
    if (Object.keys(rest).length !== 0) {
      const dateFromQuery = new Date(rest.byDate)

      const startSearchFrom = new Date(
        dateFromQuery.getFullYear(),
        dateFromQuery.getMonth(),
        1
      )
      const endSearchBy = new Date(
        dateFromQuery.getFullYear(),
        dateFromQuery.getMonth() + 1,
        0
      )

      return postModel
        .find({
          $or: [
            { categories: rest.category },
            {
              createdAt: {
                $gte: startSearchFrom,
                $lte: endSearchBy
              }
            }
          ]
        })
        .limit(limit)
        .skip(skip)
        .lean()
        .populate('tags')
    }

    return postModel.find().limit(limit).skip(skip).lean().populate('tags')
  }
}

export { BlogRepository }
