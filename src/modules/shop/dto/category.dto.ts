import { IsString } from 'class-validator'

class CategoryDto {
  @IsString()
  public name: string

  @IsString()
  public slug: string
}

export { CategoryDto }
