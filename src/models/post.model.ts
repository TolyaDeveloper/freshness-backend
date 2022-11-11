import { PATH_TO_IMAGES } from '../constants/common'
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  createdBy: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  postImageUri: { type: String, default: PATH_TO_IMAGES.NO_PRODUCT_THUMBNAIL },
  tags: [
    {
      ref: 'Tag',
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  categories: [
    {
      ref: 'Category',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

const postModel = mongoose.model('Post', postSchema)

type PostModelType = mongoose.InferSchemaType<typeof postSchema> & {
  _id: mongoose.Types.ObjectId
}

export { postModel, PostModelType }
