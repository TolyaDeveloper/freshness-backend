import { injectable } from 'inversify'
import { categoryModel } from '../../models/category.model'
import { CategoryDto } from './dto/category.dto'

@injectable()
class CategoriesRepository {
  public async find() {
    return categoryModel.find().lean()
  }

  public async add(categories: CategoryDto[]) {
    return categoryModel.insertMany(categories)
  }
}

export { CategoriesRepository }
