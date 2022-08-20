import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUri: { type: String, default: '/images/no-product-thumbnail.png' },
  description: { type: String, required: true },
  smallDescription: { type: String, required: true },
  descriptionBlock: {
    default: {},
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
  price: { type: Number, required: true },
  newPrice: { type: Number },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  sku: { type: Number, required: true },
  categories: [
    {
      ref: 'Category',
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  farm: { type: String, required: true },
  buyBy: { type: String, required: true },
  freshness: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  deliveryTime: { type: String, required: true },
  deliveryArea: { type: [String], required: true },
  reviews: { type: Array, default: [] },
  questions: { type: Array, default: [] }
})

const productModel = mongoose.model('Product', productSchema)

type ProductModelType = mongoose.InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId
}

export { productModel, ProductModelType }
