import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }
})

const categoryModel = mongoose.model('Category', categorySchema)

type CategoryModelType = mongoose.InferSchemaType<typeof categorySchema> & {
  _id: mongoose.Types.ObjectId
}

export { categoryModel, CategoryModelType }
