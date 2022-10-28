import { inject, injectable } from 'inversify'
import { unlink } from 'fs/promises'
import { TYPES } from '../../types'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { IUserRepository } from './interfaces/user.repository.interface'
import { IUserService } from './interfaces/user.service.interface'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { PATH_TO_IMAGES } from '../../constants/common'
import mongoose from 'mongoose'

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

    const updatedProfile = await this.userRepository.updateProfile(
      { ...profileChanges, avatarUri: withNewAvatar },
      userId
    )

    if (
      withNewAvatar &&
      profileChanges.currentAvatarUri !== PATH_TO_IMAGES.DEFAULT_AVATAR
    ) {
      try {
        await unlink(`public${profileChanges.currentAvatarUri}`)
      } catch {
        return updatedProfile
      }
    }

    return updatedProfile
  }
}

export { UserService }
