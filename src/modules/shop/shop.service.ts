import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { IShopRepository } from './interfaces/shop.repository.interface'
import { IShopService } from './interfaces/shop.service.interface'
import { CategoryDto } from './dto/category.dto'
import { TagDto } from './dto/tag.dto'
import { ProductDto, IFindProductsQueries } from './dto/product.dto'
import mongoose from 'mongoose'

@injectable()
class ShopService implements IShopService {
  constructor(
    @inject(TYPES.ShopRepository)
    private shopRepository: IShopRepository
  ) {}

  public async findCategories() {
    return this.shopRepository.findCategories()
  }

  public async findCategoryById(id: mongoose.Types.ObjectId) {
    return this.shopRepository.findCategoryById(id)
  }

  public async addCategory(category: CategoryDto) {
    return this.shopRepository.addCategory(category)
  }

  public async findProducts(queries: IFindProductsQueries) {
    return this.shopRepository.findProducts(queries)
  }

  public async findProductById(id: mongoose.Types.ObjectId) {
    return this.shopRepository.findProductById(id)
  }

  public async addProduct(product: ProductDto) {
    return this.shopRepository.addProduct(product)
  }

  public async findTags() {
    return this.shopRepository.findTags()
  }

  public async findTagById(id: mongoose.Types.ObjectId) {
    return this.shopRepository.findTagById(id)
  }

  public async addTag(tag: TagDto) {
    return this.shopRepository.addTag(tag)
  }
}

export { ShopService }
