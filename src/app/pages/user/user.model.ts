export interface IUserObj {
    results: IUser[],
    length: number
}

export interface IUser {
    name_eng: string,
    name_kh: string,
    email: string,
    username: string,
    password: string,
    image_path: string,
    user_image: any,
    branch_id: number,
    user_status: boolean,
    created_user_id: number,
    id: number,
    created_by: number,
    updated_by: number,
    updated_date: string
}

export interface IUserCustom {
    name_eng: string,
    name_kh: string,
    email: string,
    username: string,
    password: string,
    image_path: string,
    branch_id: number,
    status: boolean,
    created_user_id: number,
    id: number
}

export interface IResponse {
    code: number,
    message: string
}
