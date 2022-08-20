import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { CategoryModelType } from '../../models/category.model'
import { CategoryDto } from './dto/category.dto'
import { IShopRepository } from './interfaces/shop.repository.interface'
import { IShopService } from './interfaces/shop.service.interface'
import { ProductDto } from './dto/product.dto'
import mongoose from 'mongoose'
import { HttpError } from '../../exceptions/http-error.class'

@injectable()
class ShopService implements IShopService {
  constructor(
    @inject(TYPES.ShopRepository)
    private shopRepository: IShopRepository
  ) {}

  public async findAllCategories(): Promise<CategoryModelType[]> {
    return this.shopRepository.findAllCategories()
  }

  public async addCategories(
    categories: CategoryDto[]
  ): Promise<CategoryModelType[]> {
    return this.shopRepository.addCategories(categories)
  }

  public async addProduct(product: ProductDto) {
    return this.shopRepository.createProduct(product)
  }

  public async getProductById(id: mongoose.Types.ObjectId) {
    return this.shopRepository.getProductById(id)
  }
}

export { ShopService }
