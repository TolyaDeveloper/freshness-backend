import { IsString, IsArray } from 'class-validator'

class CartDto {
  @IsString({ each: true })
  @IsArray()
  public productIds: string[]
}

export { CartDto }
