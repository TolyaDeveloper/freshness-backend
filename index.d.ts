import { ITokenPayload } from './src/interfaces/token.interface'

declare global {
  namespace Express {
    export interface Request {
      user: ITokenPayload
    }
  }
}
