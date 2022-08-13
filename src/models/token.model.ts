import mongoose from 'mongoose'

interface ITokenModel {
  refreshToken: string
  userId: typeof mongoose.Schema.Types.ObjectId
}

const tokenSchema = new mongoose.Schema<ITokenModel>({
  refreshToken: { type: String, required: true },
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
})

const tokenModel = mongoose.model<ITokenModel>('Token', tokenSchema)

export { tokenModel, ITokenModel }
