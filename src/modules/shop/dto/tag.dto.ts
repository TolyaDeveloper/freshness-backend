import { IsString } from 'class-validator'

class TagDto {
  @IsString()
  public name: string

  @IsString()
  public slug: string
}

export { TagDto }
