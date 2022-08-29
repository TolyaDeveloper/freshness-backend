import mongoose from 'mongoose'
import { CategoryModelType } from '../../../models/category.model'
import { ProductModelType } from '../../../models/product.model'
import { TagModelType } from '../../../models/tag.model'
import { CategoryDto } from '../dto/category.dto'
import { ProductDto, IFindProductsQueries } from '../dto/product.dto'
import { TagDto } from '../dto/tag.dto'

export interface IShopService {
  findAllCategories: () => Promise<CategoryModelType[]>
  addCategory: (category: CategoryDto) => Promise<CategoryModelType>
  addProduct: (product: ProductDto) => Promise<ProductModelType>
  findProducts: (queries: IFindProductsQueries) => Promise<ProductModelType[]>
  findProductById: (
    id: mongoose.Types.ObjectId
  ) => Promise<ProductModelType | null>
  findTagById: (id: mongoose.Types.ObjectId) => Promise<TagModelType | null>
  addTag: (tag: TagDto) => Promise<TagModelType>
  findAllTags: () => Promise<TagModelType[]>
}
