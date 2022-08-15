import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  smallDescription: { type: String },
  descriptionBlock: {
    origins: { type: String },
    howToCook: { type: String },
    vitamins: [
      {
        vitamin: { type: String },
        quantity: { type: String },
        dv: { type: Number }
      }
    ]
  },
  price: { type: Number },
  oldPrice: { type: Number },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  sku: { type: Number },
  category: {
    ref: 'Category',
    type: mongoose.Schema.Types.ObjectId
  },
  farm: { type: String },
  buyBy: { type: String },
  freshness: { type: String },
  inStock: { type: Number },
  deliveryTime: { type: String },
  deliveryArea: { type: String },
  reviews: { type: Array, default: [] },
  questions: { type: Array, default: [] }
})

const productModel = mongoose.model('Product', productSchema)

type ProductModelType = mongoose.InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId
}

export { productModel, ProductModelType }
