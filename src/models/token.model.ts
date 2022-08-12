import mongoose from 'mongoose'

interface ITokenModel {
  refreshToken: string
  user: typeof mongoose.Schema.Types.ObjectId
}

const tokenSchema = new mongoose.Schema<ITokenModel>({
  refreshToken: { type: String, required: true },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
})

const tokenModel = mongoose.model<ITokenModel>('Token', tokenSchema)

export { tokenModel, ITokenModel }
