import { injectable } from 'inversify'
import { IUserRepository } from './interfaces/user.repository.interface'
import { userModel, UserModelType } from '../../models/user.model'
import { SignupDto } from '../auth/dto/signup.dto'
import { customerReviewModel } from '../../models/customer-review.model'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { productModel } from '../../models/product.model'
import {
  AddToCartDto,
  UpdateCartDto,
  UpdateProfileDto
} from './dto/update-profile.dto'
import mongoose from 'mongoose'

@injectable()
class UserRepository implements IUserRepository {
  public async findUserByEmail(email: string) {
    return userModel.findOne({ email }).lean()
  }

  public async createUser(credentials: SignupDto) {
    return userModel.create(credentials)
  }

  public async findUserByActivationLink(
    activationLink: mongoose.Types.ObjectId
  ) {
    return userModel.findOne({ activationLink })
  }

  public async findUserById(id: mongoose.Types.ObjectId) {
    return userModel.findById(id).lean()
  }

  public async findCustomerReviews() {
    return customerReviewModel.find().lean()
  }

  public async addCustomerReview(customerReviewDto: CustomerReviewDto) {
    return customerReviewModel.create(customerReviewDto)
  }

  public async findProductsByIds(productsIds: mongoose.Types.ObjectId[]) {
    return productModel
      .find({ _id: { $in: productsIds } }, { reviews: 0, descriptionBlock: 0 })
      .lean()
  }

  public async updateProfile(
    { firstName, lastName, avatarUri }: UpdateProfileDto,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: {
            firstName,
            lastName,
            avatarUri
          }
        },
        {
          projection: { firstName: 1, lastName: 1, avatarUri: 1 },
          new: true
        }
      )
      .lean()
  }

  public async addToWishlist(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findByIdAndUpdate(
      userId,
      {
        $push: { wishlist: productId }
      },
      { new: true, projection: { wishlist: 1 } }
    )
  }

  public async removeFromWishlist(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { wishlist: productId }
      },
      { new: true, projection: { wishlist: 1 } }
    )
  }

  public async addToCompare(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findByIdAndUpdate(
      userId,
      {
        $push: { compare: productId }
      },
      { new: true, projection: { compare: 1 } }
    )
  }

  public async removeFromCompare(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { compare: productId }
      },
      { new: true, projection: { compare: 1 } }
    )
  }

  public async addToCart(
    productInfo: AddToCartDto,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findByIdAndUpdate(
      userId,
      { $push: { cart: productInfo } },
      {
        new: true,
        projection: { cart: 1 }
      }
    )
  }

  public async removeFromCart(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { cart: { productId } }
      },
      { new: true, projection: { cart: 1 } }
    )
  }

  public async updateCart(
    { productId, quantity, variant }: UpdateCartDto,
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findOneAndUpdate(
      { _id: userId, 'cart.productId': productId },
      {
        $set: { 'cart.$.quantity': quantity, 'cart.$.variant': variant }
      },
      { new: true, projection: { cart: 1 } }
    )
  }

  public async cleanCart(userId: mongoose.Types.ObjectId) {
    return userModel.findByIdAndUpdate(userId, { $set: { cart: [] } })
  }

  public async createOrder(
    products: mongoose.Types.ObjectId[],
    userId: mongoose.Types.ObjectId
  ) {
    return userModel.findByIdAndUpdate(
      userId,
      {
        $push: { ordersHistory: [...products] }
      },
      { new: true, projection: { ordersHistory: 1 } }
    )
  }
}

export { UserRepository }
