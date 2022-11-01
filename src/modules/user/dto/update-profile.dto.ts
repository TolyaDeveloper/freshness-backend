import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { ProductCartVariantEnum } from '../../../interfaces/cart.interface'
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

class RemoveFromWishlistDto {
  @IsNotEmpty()
  @IsString()
  public productId: mongoose.Types.ObjectId
}

class AddToCompareDto {
  @IsNotEmpty()
  @IsString()
  public productId: mongoose.Types.ObjectId
}

class RemoveFromCompareDto {
  @IsNotEmpty()
  @IsString()
  public productId: mongoose.Types.ObjectId
}

class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  public productId: mongoose.Types.ObjectId

  @IsNotEmpty()
  @IsString()
  public variant: ProductCartVariantEnum

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public quantity: number
}

class RemoveFromCartDto {
  @IsNotEmpty()
  @IsString()
  public productId: mongoose.Types.ObjectId
}

class UpdateCartDto {
  @IsNotEmpty()
  @IsString()
  public productId: mongoose.Types.ObjectId

  @IsNotEmpty()
  @IsString()
  public variant: ProductCartVariantEnum

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public quantity: number
}

export {
  UpdateProfileDto,
  AddToWishlistDto,
  RemoveFromWishlistDto,
  AddToCompareDto,
  RemoveFromCompareDto,
  AddToCartDto,
  RemoveFromCartDto,
  UpdateCartDto
}
