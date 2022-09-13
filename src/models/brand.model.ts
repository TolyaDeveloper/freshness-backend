import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
})

const brandModel = mongoose.model('Brand', brandSchema)

type BrandModelType = mongoose.InferSchemaType<typeof brandSchema> & {
  _id: mongoose.Types.ObjectId
}

export { brandModel, BrandModelType }
