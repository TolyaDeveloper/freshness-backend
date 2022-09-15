import { injectable } from 'inversify'
import { IUserRepository } from './interfaces/user.repository.interface'
import { userModel } from '../../models/user.model'
import { SignupDto } from '../auth/dto/signup.dto'
import { customerReviewModel } from '../../models/customer-review.model'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { productModel } from '../../models/product.model'
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

  public async findCartGoods(productsIds: mongoose.Types.ObjectId[]) {
    return productModel.find({ _id: { $in: productsIds } }).lean()
  }
}

export { UserRepository }
