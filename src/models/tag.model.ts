import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }
})

const tagModel = mongoose.model('Tag', tagSchema)

type TagModelType = mongoose.InferSchemaType<typeof tagSchema> & {
  _id: mongoose.Types.ObjectId
}

export { tagModel, TagModelType }
