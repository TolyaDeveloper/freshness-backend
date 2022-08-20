import { injectable } from 'inversify'
import mongoose from 'mongoose'
import { categoryModel } from '../../models/category.model'
import { productModel } from '../../models/product.model'
import { CategoryDto } from './dto/category.dto'
import { ProductDto } from './dto/product.dto'
import { IShopRepository } from './interfaces/shop.repository.interface'

@injectable()
class ShopRepository implements IShopRepository {
  public async findAllCategories() {
    return categoryModel.find().lean()
  }

  public async addCategories(categories: CategoryDto[]) {
    return categoryModel.insertMany(categories)
  }

  public async createProduct(product: ProductDto) {
    return productModel.create(product)
  }

  public async getProductById(id: mongoose.Types.ObjectId) {
    return productModel.findById(id).populate('categories')
  }
}

export { ShopRepository }
