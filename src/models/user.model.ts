import { PATH_TO_IMAGES } from '../constants/common'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8 },
  roles: [{ type: String, ref: 'Role' }],
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  avatarUri: { type: String, default: PATH_TO_IMAGES.DEFAULT_AVATAR },
  wishlist: [
    {
      ref: 'Product',
      type: mongoose.Schema.Types.ObjectId,
      default: []
    }
  ],
  cart: [
    {
      ref: 'Product',
      type: mongoose.Schema.Types.ObjectId,
      default: []
    }
  ],
  ordersHistory: [
    {
      ref: 'Product',
      type: mongoose.Schema.Types.ObjectId,
      default: []
    }
  ],
  compare: [
    {
      ref: 'Product',
      type: mongoose.Schema.Types.ObjectId,
      default: []
    }
  ]
})

const userModel = mongoose.model('User', userSchema)

type UserModelType = mongoose.InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId
}

export { userModel, UserModelType }
