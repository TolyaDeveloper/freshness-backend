import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { IUserRepository } from './interfaces/user.repository.interface'
import { IUserService } from './interfaces/user.service.interface'
import { UpdateProfileDto } from './dto/update-profile.dto'
import mongoose from 'mongoose'
import { PATH_TO_IMAGES } from '../../constants/common'

@injectable()
class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  public async findCustomerReviews() {
    return this.userRepository.findCustomerReviews()
  }

  public async addCustomerReview(customerReviewDto: CustomerReviewDto) {
    return this.userRepository.addCustomerReview(customerReviewDto)
  }

  public async findCartGoods(productIds: mongoose.Types.ObjectId[]) {
    return this.userRepository.findCartGoods(productIds)
  }

  public async updateProfile(
    profileChanges: UpdateProfileDto,
    userId: mongoose.Types.ObjectId
  ) {
    const withNewAvatar = profileChanges.avatarUri
      ? `${PATH_TO_IMAGES.PATH_TO_AVATARS}/${profileChanges.avatarUri}`
      : undefined

    return this.userRepository.updateProfile(
      { ...profileChanges, avatarUri: withNewAvatar },
      userId
    )
  }
}

export { UserService }
