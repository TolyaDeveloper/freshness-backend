import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator'

class SignupDto {
  @IsNotEmpty()
  @IsString()
  public firstName: string

  @IsNotEmpty()
  @IsString()
  public lastName: string

  @IsEmail()
  public email: string

  @MinLength(8)
  @IsString()
  public password: string
}

export { SignupDto }
