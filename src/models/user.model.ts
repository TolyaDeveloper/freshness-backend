import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

const defaultAvatarUri = `${process.env.SERVER_URI}/images/default-avatar-96.png`

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8 },
  isActivated: { type: Boolean, default: false },
  avatarUri: { type: String, default: defaultAvatarUri },
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
