import { BlogPostDto } from '../dto/blog-post.dto'
import { IBlogPostQueries } from './blog.controller.interface'
import { PostModelType } from '../../../models/post.model'
import mongoose from 'mongoose'

export interface IBlogService {
  findBlogPosts(queries: IBlogPostQueries): Promise<PostModelType[]>
  findBlogPostById(id: mongoose.Types.ObjectId): Promise<PostModelType | null>
  addBlogPost(
    blogPost: BlogPostDto,
    userId: mongoose.Types.ObjectId
  ): Promise<PostModelType>
}
