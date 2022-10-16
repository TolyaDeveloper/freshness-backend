import { injectable } from 'inversify'
import { categoryModel } from '../../models/category.model'
import {
  productModel,
  ProductModelBiologyEnum
} from '../../models/product.model'
import { tagModel } from '../../models/tag.model'
import {
  IShopRepository,
  IGatherCategoryFilters
} from './interfaces/shop.repository.interface'
import { CategoryDto } from './dto/category.dto'
import { TagDto } from './dto/tag.dto'
import { ProductDto } from './dto/product.dto'
import {
  IGatherCategoryFiltersQueries,
  IFindProductsQueries
} from './interfaces/shop.controller.interface'
import { handleQueryObject } from '../../utils/handleQueryObject'
import mongoose from 'mongoose'

@injectable()
class ShopRepository implements IShopRepository {
  public async findCategories() {
    return categoryModel.find().lean()
  }

  public async gatherCategoryFilters({
    category
  }: IGatherCategoryFiltersQueries): Promise<IGatherCategoryFilters> {
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
        $unset: '_id'
      },
      {
        $unwind: {
          path: '$category'
        }
      }
    ])

    const [filters] = await productModel.aggregate([
      {
        $match: {
          categories: {
            $eq: new mongoose.Types.ObjectId(category)
          }
        }
      },
      {
        $facet: {
          minMaxPrices: [
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
          ],
          brands: [
            { $group: { _id: '$brand' } },
            {
              $lookup: {
                from: 'brands',
                localField: '_id',
                foreignField: '_id',
                as: 'brand'
              }
            },
            {
              $unset: '_id'
            },
            { $unwind: '$brand' }
          ],
          countries: [
            {
              $unwind: {
                path: '$deliveryArea'
              }
            },
            {
              $group: {
                _id: '$deliveryArea',
                total: {
                  $sum: 1
                }
              }
            },
            { $project: { _id: 0, country: '$_id', total: 1 } }
          ],
          farmCount: [
            { $match: { biology: ProductModelBiologyEnum.Farm } },
            { $count: 'total' }
          ],
          bioCount: [
            { $match: { biology: ProductModelBiologyEnum.Bio } },
            { $count: 'total' }
          ],
          totalCategoryProducts: [{ $count: 'total' }]
        }
      }
    ])

    return { categories, filters }
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
        rating: handleQueryObject({ $in: rest.rating }),
        biology: handleQueryObject({ $in: rest.biology }),
        price: handleQueryObject({ $gte: rest.minPrice, $lte: rest.maxPrice }),
        deliveryArea: rest.country
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
