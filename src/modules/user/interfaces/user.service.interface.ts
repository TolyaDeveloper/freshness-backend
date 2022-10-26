import { CustomerReviewModelType } from '../../../models/customer-review.model'
import { ProductModelType } from '../../../models/product.model'
import { CustomerReviewDto } from '../dto/customer-review.dto'
import mongoose from 'mongoose'
import { UpdateProfileDto } from '../dto/update-profile.dto'
import { UserModelType } from '../../../models/user.model'

export interface IUserService {
  findCustomerReviews(): Promise<CustomerReviewModelType[]>
  addCustomerReview(
    customerReviewDto: CustomerReviewDto
  ): Promise<CustomerReviewModelType>
  findCartGoods(
    productIds: mongoose.Types.ObjectId[]
  ): Promise<ProductModelType[]>
  updateProfile(
    profileChanges: UpdateProfileDto,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
}
