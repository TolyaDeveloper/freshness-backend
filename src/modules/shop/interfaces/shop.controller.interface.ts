import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { BaseController } from '../../../common/base.controller'
import { ProductDto } from '../dto/product.dto'

export interface IShopController extends BaseController {
  findAllCategories: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  addCategories: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  addProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>
  findProductById: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
}
