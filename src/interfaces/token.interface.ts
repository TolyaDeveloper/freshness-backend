import mongoose from 'mongoose'

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface ITokenPayload {
  _id: mongoose.Types.ObjectId
  isActivated: boolean
}
