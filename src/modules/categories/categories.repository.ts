import { injectable } from 'inversify'
import { ICategoryModel, categoryModel } from '../../models/category.model'
import { ICategoriesRepository } from './interfaces/categories.repository.interface'

@injectable()
class CategoriesRepository implements ICategoriesRepository {
  public async find(): Promise<ICategoryModel> {
    return categoryModel.find().lean()
  }
}

export { CategoriesRepository }
