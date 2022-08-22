import {
  IsString,
  IsOptional,
  IsObject,
  IsNumber,
  IsPositive,
  IsIn,
  IsArray,
  IsNotEmptyObject,
  IsBoolean
} from 'class-validator'
import mongoose from 'mongoose'

class ProductDto {
  @IsString()
  public title: string

  @IsString()
  @IsOptional()
  public imageUri: string

  @IsString()
  public description: string

  @IsString()
  public smallDescription: string

  @IsNotEmptyObject()
  @IsObject()
  @IsOptional()
  public descriptionBlock: string

  @IsPositive()
  @IsNumber()
  public price: number

  @IsPositive()
  @IsNumber()
  @IsOptional()
  public newPrice: number

  @IsNumber()
  @IsIn([0, 1, 2, 3, 4, 5])
  @IsOptional()
  public rating: number

  @IsNumber()
  public sku: number

  @IsString({ each: true })
  @IsArray()
  public tags: string[]

  @IsString({ each: true })
  @IsArray()
  public categories: string[]

  @IsString()
  public farm: string

  @IsString()
  public buyBy: string

  @IsString()
  public freshness: string

  @IsBoolean()
  public inStock: boolean

  @IsString()
  public deliveryTime: string

  @IsString({ each: true })
  @IsArray()
  public deliveryArea: string[]

  @IsArray()
  @IsOptional()
  public reviews: any[]

  @IsArray()
  @IsOptional()
  public questions: any[]
}

interface IFindProductsQueries {
  limit: number
  skip: number
  category: mongoose.Types.ObjectId
  tag: mongoose.Types.ObjectId
}

export { ProductDto, IFindProductsQueries }
