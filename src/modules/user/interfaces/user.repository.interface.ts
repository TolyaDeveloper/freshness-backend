import { UserModelType } from '../../../models/user.model'
import { CustomerReviewModelType } from '../../../models/customer-review.model'
import { SignupDto } from '../../auth/dto/signup.dto'
import { CustomerReviewDto } from '../dto/customer-review.dto'
import { ProductModelType } from '../../../models/product.model'
import {
  AddToCartDto,
  UpdateCartDto,
  UpdateProfileDto
} from '../dto/update-profile.dto'
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
  findProductsByIds(
    productIds: mongoose.Types.ObjectId[]
  ): Promise<ProductModelType[]>
  updateProfile(
    profileChanges: UpdateProfileDto,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  addToWishlist(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  removeFromWishlist(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  addToCompare(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  removeFromCompare(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  addToCart(
    productInfo: AddToCartDto,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  removeFromCart(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  updateCart(
    productInfo: UpdateCartDto,
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
  cleanCart(userId: mongoose.Types.ObjectId): Promise<UserModelType | null>
  createOrder(
    products: mongoose.Types.ObjectId[],
    userId: mongoose.Types.ObjectId
  ): Promise<UserModelType | null>
}
