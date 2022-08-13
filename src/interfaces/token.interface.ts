import mongoose from 'mongoose'

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface ITokenPayload {
  _id: mongoose.Schema.Types.ObjectId
  isActivated: boolean
}
