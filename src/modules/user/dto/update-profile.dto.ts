import { IsString, IsNotEmpty } from 'class-validator'

class UpdateProfileDto {
  @IsNotEmpty()
  @IsString()
  public firstName: string

  @IsNotEmpty()
  @IsString()
  public lastName: string

  public avatarUri: string | undefined
}

export { UpdateProfileDto }
