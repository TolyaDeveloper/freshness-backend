import { IsString, IsEmail, MinLength } from 'class-validator'
import { UserModelType } from '../../../models/user.model'

class LoginDto {
  @IsEmail()
  public email: string

  @MinLength(8)
  @IsString()
  public password: string
}

class UserReturnDto {
  public user: UserModelType = {} as UserModelType

  constructor(model: UserModelType) {
    this.user.firstName = model.firstName
    this.user.lastName = model.lastName
    this.user.email = model.email
    this.user.avatarUri = model.avatarUri
    this.user.wishlist = model.wishlist
    this.user.cart = model.cart
    this.user.compare = model.compare
    this.user.ordersHistory = model.ordersHistory
  }
}

export { LoginDto, UserReturnDto }
