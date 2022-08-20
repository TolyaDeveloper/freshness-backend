import { injectable } from 'inversify'
import { categoryModel } from '../../models/category.model'
import { productModel } from '../../models/product.model'
import { CategoryDto } from './dto/category.dto'
import { ProductDto } from './dto/product.dto'
import { IShopRepository } from './interfaces/shop.repository.interface'
import mongoose from 'mongoose'
import { tagModel } from '../../models/tag.model'
import { TagDto } from './dto/tag.dto'

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

  public async findProductById(id: mongoose.Types.ObjectId) {
    return productModel.findById(id).populate('categories').lean()
  }

  public async findTagById(id: mongoose.Types.ObjectId) {
    return tagModel.findById(id).lean()
  }

  public async addTags(tags: TagDto[]) {
    return tagModel.insertMany(tags)
  }
}

export { ShopRepository }
