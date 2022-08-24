import { injectable } from 'inversify'
import { roleModel } from '../../models/role.model'
import { IAuthRepository } from './interfaces/auth.repository.interface'

@injectable()
class AuthRepository implements IAuthRepository {
  public async findRoleByName(role: string) {
    return roleModel.findOne({ role })
  }
}

export { AuthRepository }
