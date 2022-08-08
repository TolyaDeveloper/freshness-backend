import { IsString, IsEmail, MinLength } from 'class-validator'

class SignupDto {
  @MinLength(2)
  @IsString()
  public name: string

  @IsEmail()
  public email: string

  @MinLength(8)
  @IsString()
  public password: string
}

export { SignupDto }
