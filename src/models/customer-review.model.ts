import mongoose from 'mongoose'

const customerReviewSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  fullname: { type: String, required: true },
  avatarUri: { type: String, default: '/images/default-avatar-96.png' }
})

const customerReviewModel = mongoose.model(
  'Customer-Review',
  customerReviewSchema
)

type CustomerReviewModelType = mongoose.InferSchemaType<
  typeof customerReviewSchema
> & {
  _id: mongoose.Types.ObjectId
}

export { customerReviewModel, CustomerReviewModelType }
