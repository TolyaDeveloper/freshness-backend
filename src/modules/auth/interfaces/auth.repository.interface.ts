import { RoleModelType } from '../../../models/role.model'

export interface IAuthRepository {
  findRoleByName(role: string): Promise<RoleModelType | null>
}
