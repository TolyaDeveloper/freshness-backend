import { ICategoryModel } from '../../../models/category.model'

export interface ICategoriesService {
  getAllCategories: () => Promise<ICategoryModel>
}
