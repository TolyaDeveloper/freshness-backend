import { IsString, IsOptional, IsArray } from 'class-validator'
import mongoose from 'mongoose'

class BlogPostDto {
  @IsString()
  public title: string

  @IsString()
  @IsOptional()
  public postImageUri: string

  @IsArray()
  public tags: string[]

  @IsArray()
  public categories: string[]

  public createdBy: mongoose.Types.ObjectId
}

export { BlogPostDto }
