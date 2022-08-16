import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'

export interface IAuthController extends BaseController {
  signup: (req: Request, res: Response, next: NextFunction) => void
  login: (req: Request, res: Response, next: NextFunction) => void
  activate: (req: Request, res: Response, next: NextFunction) => void
  logout: (req: Request, res: Response, next: NextFunction) => void
}
