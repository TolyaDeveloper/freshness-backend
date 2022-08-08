import { NextFunction, Request, Response } from 'express'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidatorOptions } from 'class-validator'
import { IMiddleware } from './middleware.interface'
import { HttpError } from '../exceptions/http-error.class'

class ValidateMiddleware implements IMiddleware {
  constructor(
    public classToValidate: ClassConstructor<object>,
    public options?: ValidatorOptions
  ) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToInstance(this.classToValidate, body)

    validate(instance, {
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
      ...this.options
    }).then(errors => {
      if (errors.length > 0) {
        return next(new HttpError(422, errors.toString()))
      }

      next()
    })
  }
}

export { ValidateMiddleware }
