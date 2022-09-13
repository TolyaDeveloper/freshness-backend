import { injectable } from 'inversify'
import { categoryModel } from '../../models/category.model'
import { productModel } from '../../models/product.model'
import { tagModel } from '../../models/tag.model'
import { IShopRepository } from './interfaces/shop.repository.interface'
import { CategoryDto } from './dto/category.dto'
import { TagDto } from './dto/tag.dto'
import { ProductDto, IFindProductsQueries } from './dto/product.dto'
import mongoose from 'mongoose'
import { brandModel } from '../../models/brand.model'

@injectable()
class ShopRepository implements IShopRepository {
  public async findCategories() {
    return categoryModel.find().lean()
  }

  public async gatherCategoryFilters() {
    const categories = await productModel.aggregate([
      {
        $unwind: {
          path: '$categories'
        }
      },
      {
        $group: {
          _id: '$categories',
          total: {
            $sum: 1
          }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category'
        }
      }
    ])

    const [minMaxPrices] = await productModel.aggregate([
      {
        $match: {
          categories: {
            $eq: new mongoose.Types.ObjectId('62f15759ce013e411167b099')
          }
        }
      },
      {
        $group: {
          _id: null,
          minPrice: {
            $min: '$price'
          },
          maxPrice: {
            $max: '$price'
          }
        }
      }
    ])

    return { categories, minMaxPrices }
  }

  public async findCategoryById(id: mongoose.Types.ObjectId) {
    return categoryModel.findById(id).lean()
  }

  public async addCategory(category: CategoryDto) {
    return categoryModel.create(category)
  }

  public async findProducts({ limit, skip, ...rest }: IFindProductsQueries) {
    return productModel
      .find({
        categories: rest.category,
        tags: rest.tag,
        rating: rest.rating
      })
      .limit(limit)
      .skip(skip)
      .lean()
  }

  public async findProductById(id: mongoose.Types.ObjectId) {
    return productModel.findById(id).populate('categories').lean()
  }

  public async addProduct(product: ProductDto) {
    return productModel.create(product)
  }

  public async findTags() {
    return tagModel.find().lean()
  }

  public async findTagById(id: mongoose.Types.ObjectId) {
    return tagModel.findById(id).lean()
  }

  public async addTag(tag: TagDto) {
    return tagModel.create(tag)
  }
}

export { ShopRepository }
