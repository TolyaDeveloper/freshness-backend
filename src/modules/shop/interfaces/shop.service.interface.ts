import mongoose from 'mongoose'
import { CategoryModelType } from '../../../models/category.model'
import { ProductModelType } from '../../../models/product.model'
import { TagModelType } from '../../../models/tag.model'
import { CategoryDto } from '../dto/category.dto'
import { ProductDto } from '../dto/product.dto'
import { TagDto } from '../dto/tag.dto'

export interface IShopService {
  findAllCategories: () => Promise<CategoryModelType[]>
  addCategories: (categories: CategoryDto[]) => Promise<CategoryModelType[]>
  addProduct: (product: ProductDto) => Promise<ProductModelType>
  findProductById: (
    id: mongoose.Types.ObjectId
  ) => Promise<ProductModelType | null>
  findTagById: (id: mongoose.Types.ObjectId) => Promise<TagModelType | null>
  addTags: (tags: TagDto[]) => Promise<TagModelType[]>
}
