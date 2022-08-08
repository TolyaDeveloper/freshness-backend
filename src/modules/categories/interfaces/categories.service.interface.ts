import { ICategoryModel } from '../../../models/category.model'

export interface ICategoriesService {
  findAllCategories: () => Promise<ICategoryModel>
  addCategories: (categories: ICategoryModel[]) => Promise<ICategoryModel[]>
}
