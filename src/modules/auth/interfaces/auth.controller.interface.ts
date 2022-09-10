import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'

export interface IAuthController extends BaseController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>
  login(req: Request, res: Response, next: NextFunction): Promise<void>
  activate(req: Request, res: Response, next: NextFunction): Promise<void>
  logout(req: Request, res: Response, next: NextFunction): Promise<void>
  refresh(req: Request, res: Response, next: NextFunction): Promise<void>
}
