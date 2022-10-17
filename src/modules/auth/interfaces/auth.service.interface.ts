import { LoginDto } from '../dto/login.dto'
import { SignupDto } from '../dto/signup.dto'
import { ITokens } from '../../../interfaces/token.interface'
import mongoose from 'mongoose'

export interface IAuthService {
  signup(credentials: SignupDto): Promise<ITokens>
  login(credentials: LoginDto): Promise<ITokens>
  activate(id: mongoose.Types.ObjectId): Promise<void>
  logout(refreshToken: string): Promise<void>
  refresh(refreshToken: string): Promise<ITokens>
}
