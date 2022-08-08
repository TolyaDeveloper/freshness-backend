import mongoose from 'mongoose'

interface ICategoryModel {
  name: string
  slug: string
}

const categorySchema = new mongoose.Schema<ICategoryModel>({
  name: { type: String },
  slug: { type: String }
})

const categoryModel = mongoose.model<ICategoryModel>('Category', categorySchema)

export { ICategoryModel, categoryModel }
