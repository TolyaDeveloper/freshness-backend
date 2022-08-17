import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { CategoryModelType } from '../../models/category.model'
import { ICategoriesRepository } from './interfaces/categories.repository.interface'
import { CategoryDto } from './dto/category.dto'

@injectable()
class CategoriesService {
  constructor(
    @inject(TYPES.CategoriesRepository)
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async findAllCategories(): Promise<CategoryModelType[]> {
    return this.categoriesRepository.find()
  }

  public async addCategories(
    categories: CategoryDto[]
  ): Promise<CategoryModelType[]> {
    return this.categoriesRepository.add(categories)
  }
}

export { CategoriesService }
