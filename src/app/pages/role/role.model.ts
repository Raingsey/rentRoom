export interface IRole {
  id: number,
  role_name: string,
  description: string
  created_by: number,
  updated_by: number,
  updated_date: string
}

export interface IRoleObj {
  results: IRole[],
  length: number
}
