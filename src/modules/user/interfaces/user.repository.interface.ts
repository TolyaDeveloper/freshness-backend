import { UserModelType } from '../../../models/user.model'
import { CustomerReviewModelType } from '../../../models/customer-review.model'
import { SignupDto } from '../../auth/dto/signup.dto'
import { CustomerReviewDto } from '../dto/customer-review.dto'
import { ProductModelType } from '../../../models/product.model'
import mongoose from 'mongoose'

export interface IUserRepository {
  findUserByEmail: (email: string) => Promise<UserModelType | null>
  createUser: (credentials: SignupDto) => Promise<UserModelType>
  findUserByActivationLink: (
    activationLink: string
  ) => Promise<(UserModelType & mongoose.Document) | null>
  findUserById: (id: mongoose.Types.ObjectId) => Promise<UserModelType | null>
  findCustomersReviews: () => Promise<CustomerReviewModelType[]>
  addCustomerReview: (
    customerReviewDto: CustomerReviewDto
  ) => Promise<CustomerReviewModelType>
  findAllCart: (
    productIds: mongoose.Types.ObjectId[]
  ) => Promise<ProductModelType[]>
}
