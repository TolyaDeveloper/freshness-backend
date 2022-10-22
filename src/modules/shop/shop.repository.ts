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
import { ProductReviewDto } from './dto/product-review.dto'
import {
  IGatherCategoryFiltersQueries,
  IFindProductsQueries
} from './interfaces/shop.controller.interface'
import { handleQueryObject } from '../../utils/handleQueryObject'
import { PriceTypeSortEnum } from './shop.variables'
import { nanoid } from 'nanoid'
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

  public async findProductComments(productId: mongoose.Types.ObjectId) {
    return productModel
      .findById(productId, { reviews: 1 })
      .populate('reviews.user', 'firstName lastName avatarUri')
      .lean()
  }

  public async findReviewsAndQuestionsCount(id: mongoose.Types.ObjectId) {
    const [counts] = await productModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      {
        $facet: {
          reviewsCount: [
            { $project: { reviewsCount: { $size: '$reviews' }, _id: 0 } }
          ],
          questionsCount: [
            { $project: { questionsCount: { $size: '$questions' }, _id: 0 } }
          ]
        }
      }
    ])

    return counts
  }

  public async addCategory(category: CategoryDto) {
    return categoryModel.create(category)
  }

  public async findProducts({ limit, skip, ...rest }: IFindProductsQueries) {
    let sortQuery = {}

    switch (rest.priceType) {
      case PriceTypeSortEnum.CHEAPEST:
        sortQuery = { price: 1 }
        break
      case PriceTypeSortEnum.MOST_POPULAR:
        sortQuery = { rating: -1 }
    }

    return productModel
      .find(
        {
          categories: rest.category,
          tags: rest.tag,
          rating: handleQueryObject({ $in: rest.rating }),
          biology: handleQueryObject({ $in: rest.biology }),
          price: handleQueryObject({
            $gte: rest.minPrice,
            $lte: rest.maxPrice
          }),
          deliveryArea: rest.country
        },
        { reviews: 0, questions: 0 }
      )
      .skip(skip)
      .limit(limit)
      .sort(sortQuery)
      .lean()
  }

  public async findProductById(id: mongoose.Types.ObjectId) {
    return productModel
      .findById(id, { reviews: 0, questions: 0 })
      .populate('categories')
      .lean()
  }

  public async addProduct(product: ProductDto) {
    return productModel.create(product)
  }

  public async addProductReview(
    review: ProductReviewDto,
    userId: mongoose.Types.ObjectId
  ) {
    return productModel
      .findOneAndUpdate(
        { _id: review.productId },
        {
          $push: {
            reviews: {
              _id: nanoid(),
              comment: review.comment,
              user: userId,
              createdAt: new Date()
            }
          }
        }
      )
      .lean()
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
