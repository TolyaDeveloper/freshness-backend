import { ICategoryModel } from '../../../models/category.model'

export interface ICategoriesService {
  getAllCategories: () => Promise<ICategoryModel>
  addCategories: (categories: ICategoryModel[]) => Promise<ICategoryModel[]>
}
