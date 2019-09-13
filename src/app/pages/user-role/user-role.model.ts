import {IRole} from '../role/role.model';
import {IUserCustom} from '../user/user.model';
export interface IuserRoleObj {
  id: number,
  user: IUserCustom
  role: IRole,
}
export interface IuserRole {
  id: number,
  user: number,
  role: number
}
export interface Role {
  id: number,
  role_name: string
}
export interface Users {
  id: number,
  firstname: string
}
export interface IuserRoleCustom {
  id: string,
  role_name: string,
  description: string,
  checked: boolean
}
