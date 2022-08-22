import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'

export interface IShopController extends BaseController {
  findAllCategories: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  addCategory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  addProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>
  findProducts: (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  findProductById: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  findTagById: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
  addTag: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
