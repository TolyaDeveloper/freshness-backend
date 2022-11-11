import { IsString, IsOptional } from 'class-validator'

class CustomerReviewDto {
  @IsString()
  public quote: string

  @IsString()
  public fullname: string

  @IsString()
  @IsOptional()
  public avatarUri: string
}

export { CustomerReviewDto }
