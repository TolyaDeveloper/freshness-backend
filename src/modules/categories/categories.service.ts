import { inject, injectable } from 'inversify'
import { ICategoryModel } from '../../models/category.model'
import { TYPES } from '../../types'
import { ICategoriesRepository } from './interfaces/categories.repository.interface'

@injectable()
class CategoriesService {
  constructor(
    @inject(TYPES.CategoriesRepository)
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async getAllCategories(): Promise<ICategoryModel> {
    return this.categoriesRepository.find()
  }
}

export { CategoriesService }
