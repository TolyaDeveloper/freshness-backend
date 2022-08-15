import { type CategoryModelType } from '../../../models/category.model'
import { CategoryDto } from '../dto/category.dto'

export interface ICategoriesRepository {
  find: () => Promise<CategoryModelType[]>
  add: (categories: CategoryDto[]) => Promise<CategoryModelType[]>
}
