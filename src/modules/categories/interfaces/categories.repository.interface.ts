import { ICategoryModel } from '../../../models/category.model'

export interface ICategoriesRepository {
  find: () => Promise<ICategoryModel>
  add: (categories: ICategoryModel[]) => Promise<ICategoryModel[]>
}