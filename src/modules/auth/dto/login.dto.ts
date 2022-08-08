import { IsString, IsEmail, MinLength } from 'class-validator'

class LoginDto {
  @IsEmail()
  public email: string

  @MinLength(8)
  @IsString()
  public password: string
}

export { LoginDto }
