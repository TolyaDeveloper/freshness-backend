import { UserModelType } from '../../../models/user.model'
import { CustomerReviewModelType } from '../../../models/customer-review.model'
import { SignupDto } from '../../auth/dto/signup.dto'
import { CustomerReviewDto } from '../dto/customer-review.dto'
import { ProductModelType } from '../../../models/product.model'
import mongoose from 'mongoose'

export interface IUserRepository {
  findUserByEmail(email: string): Promise<UserModelType | null>
  createUser(credentials: SignupDto): Promise<UserModelType>
  findUserByActivationLink(
    id: mongoose.Types.ObjectId
  ): Promise<(UserModelType & mongoose.Document) | null>
  findUserById(id: mongoose.Types.ObjectId): Promise<UserModelType | null>
  findCustomerReviews(): Promise<CustomerReviewModelType[]>
  addCustomerReview(
    customerReviewDto: CustomerReviewDto
  ): Promise<CustomerReviewModelType>
  findCartGoods(
    productIds: mongoose.Types.ObjectId[]
  ): Promise<ProductModelType[]>
}
