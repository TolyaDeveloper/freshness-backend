import { CategoryModelType } from '../../../models/category.model'
import { ProductModelType } from '../../../models/product.model'
import { TagModelType } from '../../../models/tag.model'
import { CategoryDto } from '../dto/category.dto'
import { ProductDto, IFindProductsQueries } from '../dto/product.dto'
import { TagDto } from '../dto/tag.dto'
import mongoose from 'mongoose'

export interface IShopService {
  findCategories(): Promise<CategoryModelType[]>
  findCategoryById(
    id: mongoose.Types.ObjectId
  ): Promise<CategoryModelType | null>
  addCategory(category: CategoryDto): Promise<CategoryModelType>
  findProducts(queries: IFindProductsQueries): Promise<ProductModelType[]>
  gatherCategoryFilters(): Promise<{ categories: any[]; minMaxPrices: any[] }>
  findProductById(id: mongoose.Types.ObjectId): Promise<ProductModelType | null>
  addProduct(product: ProductDto): Promise<ProductModelType>
  findTags(): Promise<TagModelType[]>
  findTagById(id: mongoose.Types.ObjectId): Promise<TagModelType | null>
  addTag(tag: TagDto): Promise<TagModelType>
}
