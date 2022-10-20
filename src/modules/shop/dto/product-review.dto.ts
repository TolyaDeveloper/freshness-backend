import { IsString } from 'class-validator'

class ProductReviewDto {
  @IsString()
  public comment: string

  @IsString()
  public productId: string
}

export { ProductReviewDto }
