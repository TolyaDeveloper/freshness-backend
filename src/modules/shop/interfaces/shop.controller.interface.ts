import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import { IFindProductsQueries } from '../dto/product.dto'

export interface IShopController extends BaseController {
  findCategories(req: Request, res: Response, next: NextFunction): Promise<void>
  findCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addCategory(req: Request, res: Response, next: NextFunction): Promise<void>
  findProducts(
    req: Request<{}, {}, {}, IFindProductsQueries>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  findProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>
  addProduct(req: Request, res: Response, next: NextFunction): Promise<void>
  findTags(req: Request, res: Response, next: NextFunction): Promise<void>
  findTagById(req: Request, res: Response, next: NextFunction): Promise<void>
  addTag(req: Request, res: Response, next: NextFunction): Promise<void>
}
