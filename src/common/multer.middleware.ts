import { NextFunction, Request, Response } from 'express'
import { IMiddleware } from './middleware.interface'
import { PATH_TO_IMAGES } from '../constants/common'
import { HttpError } from '../exceptions/http-error.class'
import { nanoid } from 'nanoid'
import { extname } from 'path'
import { AVATAR_MIME_TYPES } from '../constants/common'

import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public${PATH_TO_IMAGES.PATH_TO_AVATARS}`)
  },
  filename(req, file, cb) {
    const fileExtension = extname(file.originalname)

    cb(null, nanoid() + fileExtension)
  }
})

class MulterMiddleware implements IMiddleware {
  private upload

  constructor(private fieldName: string, customOptions?: multer.Options) {
    this.upload = multer({
      storage: storage,
      fileFilter(req, file, callback) {
        if (AVATAR_MIME_TYPES.includes(file.mimetype)) {
          callback(null, true)
        } else {
          callback(null, false)

          const multerError = new multer.MulterError('LIMIT_UNEXPECTED_FILE')
          multerError.message = `Only ${AVATAR_MIME_TYPES.join(
            ', '
          )} formats allowed!`

          return callback(multerError)
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5mb,
      ...customOptions
    }).single(this.fieldName)
  }

  execute(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, err => {
      if (!req.file) {
        return next()
      }

      if (err instanceof multer.MulterError) {
        return next(new HttpError(409, err.message))
      } else if (err) {
        return next(new HttpError(500, 'Unexpected upload error occured!'))
      }
      return next()
    })
  }
}

export { MulterMiddleware }
