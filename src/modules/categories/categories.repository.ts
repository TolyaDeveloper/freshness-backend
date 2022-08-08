import { injectable } from 'inversify'
import { ICategoryModel, categoryModel } from '../../models/category.model'
import { ICategoriesRepository } from './interfaces/categories.repository.interface'
import { CategoryDto } from './dto/category.dto'

@injectable()
class CategoriesRepository implements ICategoriesRepository {
  public async find(): Promise<ICategoryModel> {
    return categoryModel.find().lean()
  }

  public async add(categories: CategoryDto[]): Promise<ICategoryModel[]> {
    return categoryModel.insertMany(categories)
  }
}

export { CategoriesRepository }
