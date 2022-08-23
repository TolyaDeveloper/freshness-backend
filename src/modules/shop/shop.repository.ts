import { injectable } from 'inversify'
import { categoryModel } from '../../models/category.model'
import { productModel } from '../../models/product.model'
import { tagModel } from '../../models/tag.model'
import { IShopRepository } from './interfaces/shop.repository.interface'
import { CategoryDto } from './dto/category.dto'
import { ProductDto, IFindProductsQueries } from './dto/product.dto'
import { TagDto } from './dto/tag.dto'
import mongoose from 'mongoose'

@injectable()
class ShopRepository implements IShopRepository {
  public async findAllCategories() {
    return categoryModel.find().lean()
  }

  public async addCategory(category: CategoryDto) {
    return categoryModel.create(category)
  }

  public async createProduct(product: ProductDto) {
    return productModel.create(product)
  }

  public async findProducts({ limit, skip, ...rest }: IFindProductsQueries) {
    if (Object.keys(rest).length !== 0) {
      return productModel
        .find({ $or: [{ categories: rest.category }, { tags: rest.tag }] })
        .limit(limit)
        .skip(skip)
        .lean()
    }

    return productModel.find().limit(limit).skip(skip).lean()
  }

  public async findProductById(id: mongoose.Types.ObjectId) {
    return productModel.findById(id).populate('categories').lean()
  }

  public async findTagById(id: mongoose.Types.ObjectId) {
    return tagModel.findById(id).lean()
  }

  public async addTag(tag: TagDto) {
    return tagModel.create(tag)
  }
}

export { ShopRepository }
