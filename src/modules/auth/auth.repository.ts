import { injectable } from 'inversify'
import { IAuthRepository } from './interfaces/auth.repository.interface'

@injectable()
class AuthRepository implements IAuthRepository {}

export { AuthRepository }
