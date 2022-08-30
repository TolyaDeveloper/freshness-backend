import { CustomerReviewModelType } from '../../../models/customer-review.model'
import { ProductModelType } from '../../../models/product.model'
import { CustomerReviewDto } from '../dto/customer-review.dto'
import mongoose from 'mongoose'

export interface IUserService {
  findCustomersReviews: () => Promise<CustomerReviewModelType[]>
  addCustomerReview: (
    customerReviewDto: CustomerReviewDto
  ) => Promise<CustomerReviewModelType>
  findAllCart: (
    productIds: mongoose.Types.ObjectId[]
  ) => Promise<ProductModelType[]>
}
