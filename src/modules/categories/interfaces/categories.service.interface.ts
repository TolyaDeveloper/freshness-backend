import { CategoryModelType } from '../../../models/category.model'
import { CategoryDto } from '../dto/category.dto'

export interface ICategoriesService {
  findAllCategories: () => Promise<CategoryModelType[]>
  addCategories: (categories: CategoryDto[]) => Promise<CategoryModelType[]>
}
