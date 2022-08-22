import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { CategoryModelType } from '../../models/category.model'
import { CategoryDto } from './dto/category.dto'
import { IShopRepository } from './interfaces/shop.repository.interface'
import { IShopService } from './interfaces/shop.service.interface'
import { ProductDto, IFindProductsQueries } from './dto/product.dto'
import { TagDto } from './dto/tag.dto'
import mongoose from 'mongoose'

@injectable()
class ShopService implements IShopService {
  constructor(
    @inject(TYPES.ShopRepository)
    private shopRepository: IShopRepository
  ) {}

  public async findAllCategories(): Promise<CategoryModelType[]> {
    return this.shopRepository.findAllCategories()
  }

  public async addCategory(category: CategoryDto) {
    return this.shopRepository.addCategory(category)
  }

  public async addProduct(product: ProductDto) {
    return this.shopRepository.createProduct(product)
  }

  public async findProducts(queries: IFindProductsQueries) {
    return this.shopRepository.findProducts(queries)
  }

  public async findProductById(id: mongoose.Types.ObjectId) {
    return this.shopRepository.findProductById(id)
  }

  public async findTagById(id: mongoose.Types.ObjectId) {
    return this.shopRepository.findTagById(id)
  }

  public async addTag(tag: TagDto) {
    return this.shopRepository.addTag(tag)
  }
}

export { ShopService }
