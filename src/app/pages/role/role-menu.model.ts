import {IRole} from './role.model';
import {IMenuItem} from '../../ui/components/menu/menu-item';
export interface IroleMenuObj {
  id: number,
  role: IRole,
  menuitem: IMenuItem
}
export interface IroleMenu {
  id: number,
  role: number,
  menuitem: number
}
export interface Imenu {
  text: string,
  value: number,
  checked: boolean
}
