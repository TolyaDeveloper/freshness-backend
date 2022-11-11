import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../../common/base.controller'
import mongoose from 'mongoose'

export interface IActivateParams {
  id: mongoose.Types.ObjectId
}

export interface IAuthController extends BaseController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>
  login(req: Request, res: Response, next: NextFunction): Promise<void>
  activate(
    req: Request<IActivateParams>,
    res: Response,
    next: NextFunction
  ): Promise<void>
  logout(req: Request, res: Response, next: NextFunction): Promise<void>
  refresh(req: Request, res: Response, next: NextFunction): Promise<void>
}
