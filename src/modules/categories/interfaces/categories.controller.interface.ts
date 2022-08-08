import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'

export interface ICategoriesController extends BaseController {
  findAllCategories: (req: Request, res: Response, next: NextFunction) => void
  addCategories: (req: Request, res: Response, next: NextFunction) => void
}
