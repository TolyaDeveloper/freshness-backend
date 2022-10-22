import { PATH_TO_IMAGES } from '../constants/common'
import mongoose from 'mongoose'

enum ProductModelBiologyEnum {
  Bio = 'Bio',
  Farm = 'Farm'
}

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUri: { type: String, default: PATH_TO_IMAGES.NO_PRODUCT_THUMBNAIL },
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
        dv: { type: String }
      }
    ]
  },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  sku: { type: Number, required: true },
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
  ],
  farm: { type: String, required: true },
  biology: { type: String, enum: ProductModelBiologyEnum, required: true },
  buyBy: { type: String, required: true },
  freshness: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  deliveryTime: { type: String, required: true },
  deliveryArea: { type: [String], required: true },
  reviews: {
    default: [],
    _id: { type: mongoose.Schema.Types.ObjectId },
    user: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
    comment: { type: String, required: true },
    createdAt: { type: Date, required: true }
  },
  questions: { type: Array, default: [] }
})

const productModel = mongoose.model('Product', productSchema)

type ProductModelType = mongoose.InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId
}

export { productModel, ProductModelType, ProductModelBiologyEnum }
