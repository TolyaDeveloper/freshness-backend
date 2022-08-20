import mongoose from 'mongoose'
import { CategoryModelType } from '../../../models/category.model'
import { ProductModelType } from '../../../models/product.model'
import { CategoryDto } from '../dto/category.dto'
import { ProductDto } from '../dto/product.dto'

export interface IShopService {
  findAllCategories: () => Promise<CategoryModelType[]>
  addCategories: (categories: CategoryDto[]) => Promise<CategoryModelType[]>
  addProduct: (product: ProductDto) => Promise<ProductModelType>
  getProductById: (
    id: mongoose.Types.ObjectId
  ) => Promise<ProductModelType | null>
}
