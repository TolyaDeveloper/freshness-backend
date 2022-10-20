import { type CategoryModelType } from '../../../models/category.model'
import { type ProductModelType } from '../../../models/product.model'
import { type TagModelType } from '../../../models/tag.model'
import { CategoryDto } from '../dto/category.dto'
import { ProductDto } from '../dto/product.dto'
import { ProductReviewDto } from '../dto/product-review.dto'
import {
  IGatherCategoryFiltersQueries,
  IFindProductsQueries
} from './shop.controller.interface'
import { TagDto } from '../dto/tag.dto'
import mongoose from 'mongoose'

export interface IGatherCategoryFilters {
  categories: { total: number; category: CategoryModelType }[]
  filters: {
    minMaxPrices: [{ _id: null; minPrice: number; maxPrice: number }] | []
    countries: { total: number; country: string }[]
    farmCount: [{ total: number }] | []
    bioCount: [{ total: number }] | []
    totalCategoryProducts: [{ total: number }] | []
  }
}

export interface IShopService {
  findCategories(): Promise<CategoryModelType[]>
  findCategoryById(
    id: mongoose.Types.ObjectId
  ): Promise<CategoryModelType | null>
  addCategory(category: CategoryDto): Promise<CategoryModelType>
  findProducts(queries: IFindProductsQueries): Promise<ProductModelType[]>
  gatherCategoryFilters(
    queries: IGatherCategoryFiltersQueries
  ): Promise<IGatherCategoryFilters>
  findProductById(id: mongoose.Types.ObjectId): Promise<ProductModelType | null>
  findProductComments(
    productId: mongoose.Types.ObjectId
  ): Promise<ProductModelType | null>
  addProduct(product: ProductDto): Promise<ProductModelType>
  addProductReview(
    review: ProductReviewDto,
    userId: mongoose.Types.ObjectId
  ): Promise<ProductModelType | null>
  findTags(): Promise<TagModelType[]>
  findTagById(id: mongoose.Types.ObjectId): Promise<TagModelType | null>
  addTag(tag: TagDto): Promise<TagModelType>
}
