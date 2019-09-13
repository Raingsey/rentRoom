import {IRole} from '../role/role.model';

export interface UserObj {
    results: User[];
    length: number;
}

export interface User {
    id: number;
    name_eng: string;
    name_kh: string;
    email: string;
    username: string;
    password: string;
    image_path: string;
    is_super_admin: boolean;
    status: boolean;
    created_by: number;
    updated_by: number;
    user_roles: UserRole[];
    roles: number[];
}

export interface UserRole {
    id: number;
    user: User;
    role: IRole;
}

export interface Response {
    code: number;
    message: string;
}
