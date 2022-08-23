import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { BlogPostDto, IBlogPostQueries } from './dto/blog-post.dto'
import { IBlogRepository } from './interfaces/blog.repository.interface'
import { IBlogService } from './interfaces/blog.service.interface'
import mongoose from 'mongoose'

@injectable()
class BlogService implements IBlogService {
  constructor(
    @inject(TYPES.BlogRepository) private blogRepository: IBlogRepository
  ) {}

  public async addBlogPost(blogPost: BlogPostDto) {
    return this.blogRepository.addBlogPost(blogPost)
  }

  public async findBlogPostById(id: mongoose.Types.ObjectId) {
    return this.blogRepository.findBlogPostById(id)
  }

  public async findBlogPosts(queries: IBlogPostQueries) {
    return this.blogRepository.findBlogPosts(queries)
  }
}

export { BlogService }
