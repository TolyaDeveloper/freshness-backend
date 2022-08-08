import { NextFunction, Request, Response } from 'express'

export interface ICategoriesController {
  getCategories: (req: Request, res: Response, next: NextFunction) => void
  addCategories: (req: Request, res: Response, next: NextFunction) => void
}
