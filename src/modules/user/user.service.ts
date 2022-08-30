import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { IUserRepository } from './interfaces/user.repository.interface'
import { IUserService } from './interfaces/user.service.interface'
import mongoose from 'mongoose'

@injectable()
class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  public async findCustomersReviews() {
    return this.userRepository.findCustomersReviews()
  }

  public async addCustomerReview(customerReviewDto: CustomerReviewDto) {
    return this.userRepository.addCustomerReview(customerReviewDto)
  }

  public async findAllCart(productIds: mongoose.Types.ObjectId[]) {
    return this.userRepository.findAllCart(productIds)
  }
}

export { UserService }
