import { IsString, IsNotEmpty } from 'class-validator'
import mongoose from 'mongoose'

class UpdateProfileDto {
  @IsNotEmpty()
  @IsString()
  public firstName: string

  @IsNotEmpty()
  @IsString()
  public lastName: string

  @IsNotEmpty()
  @IsString()
  public currentAvatarUri: string

  public avatarUri: string | undefined
}

class AddToWishlistDto {
  @IsNotEmpty()
  @IsString()
  public productId: mongoose.Types.ObjectId
}

export { UpdateProfileDto, AddToWishlistDto }
