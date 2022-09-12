import { BlogPostDto, IBlogPostQueries } from '../dto/blog-post.dto'
import { PostModelType } from '../../../models/post.model'
import mongoose from 'mongoose'

export interface IBlogRepository {
  addBlogPost(blogPost: BlogPostDto): Promise<PostModelType>
  findBlogPostById(id: mongoose.Types.ObjectId): Promise<PostModelType | null>
  findBlogPosts(
    queries: IBlogPostQueries,
    startSearchFrom?: Date,
    endSearchBy?: Date
  ): Promise<PostModelType[]>
}
