import { inject, injectable } from 'inversify'
import { unlink } from 'fs/promises'
import { TYPES } from '../../types'
import { CustomerReviewDto } from './dto/customer-review.dto'
import { IUserRepository } from './interfaces/user.repository.interface'
import { IUserService } from './interfaces/user.service.interface'
import { AddToCartDto, UpdateProfileDto } from './dto/update-profile.dto'
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

  public async findProductsByIds(productIds: mongoose.Types.ObjectId[]) {
    return this.userRepository.findProductsByIds(productIds)
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

  public async addToWishlist(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return this.userRepository.addToWishlist(productId, userId)
  }

  public async removeFromWishlist(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return this.userRepository.removeFromWishlist(productId, userId)
  }

  public async addToCompare(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return this.userRepository.addToCompare(productId, userId)
  }

  public async removeFromCompare(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return this.userRepository.removeFromCompare(productId, userId)
  }

  public async addToCart(
    productInfo: AddToCartDto,
    userId: mongoose.Types.ObjectId
  ) {
    return this.userRepository.addToCart(productInfo, userId)
  }

  public async removeFromCart(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    return this.userRepository.removeFromCart(productId, userId)
  }
}

export { UserService }
