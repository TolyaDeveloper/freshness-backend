import { injectable } from 'inversify'
import { IUserService } from './interfaces/user.service.interface'

@injectable()
class UserService implements IUserService {}

export { UserService }
