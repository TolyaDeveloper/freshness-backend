import mongoose from 'mongoose'

const defaultAvatarUri = `${process.env.SERVER_URI}/images/default-avatar-96.png`

interface IUserModel {
  firstName: string
  lastName: string
  email: string
  password: string
  isActivated: boolean
  avatarUri: string
  wishlist: Array<unknown>
  ordersHistory: Array<unknown>
  cart: Array<unknown>
  compare: Array<unknown>
}

const userSchema = new mongoose.Schema<IUserModel>({
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

const userModel = mongoose.model<IUserModel>('User', userSchema)

export { userModel, IUserModel }
