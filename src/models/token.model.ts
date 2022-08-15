import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
})

const tokenModel = mongoose.model('Token', tokenSchema)

type TokenModelType = mongoose.InferSchemaType<typeof tokenSchema> & {
  _id: mongoose.Types.ObjectId
}

export { tokenModel, TokenModelType }
