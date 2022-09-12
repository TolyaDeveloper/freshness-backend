import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { BlogPostDto, IBlogPostQueries } from './dto/blog-post.dto'
import { IBlogRepository } from './interfaces/blog.repository.interface'
import { IBlogService } from './interfaces/blog.service.interface'
import { validateDate } from '../../utils/validateDate'
import mongoose from 'mongoose'

@injectable()
class BlogService implements IBlogService {
  constructor(
    @inject(TYPES.BlogRepository) private blogRepository: IBlogRepository
  ) {}

  public async addBlogPost(
    blogPost: BlogPostDto,
    userId: mongoose.Types.ObjectId
  ) {
    return this.blogRepository.addBlogPost({ ...blogPost, createdBy: userId })
  }

  public async findBlogPostById(id: mongoose.Types.ObjectId) {
    return this.blogRepository.findBlogPostById(id)
  }

  public async findBlogPosts(queries: IBlogPostQueries) {
    const dateFromQuery = new Date(queries.byDate)

    const startSearchFrom = validateDate(
      new Date(dateFromQuery.getFullYear(), dateFromQuery.getMonth(), 1)
    )
    const endSearchBy = validateDate(
      new Date(dateFromQuery.getFullYear(), dateFromQuery.getMonth() + 1, 0)
    )

    return this.blogRepository.findBlogPosts(
      queries,
      startSearchFrom,
      endSearchBy
    )
  }
}

export { BlogService }
