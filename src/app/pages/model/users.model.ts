export interface IUsers {
    id: number;
    name: string;
    username: string;
    contact: string;
    email: string;
    note: string;
    status: IStatus;
    store: Store;
    access_right: IAccessRight;
}

export interface IUsersObj {
    results: IUsers[],
    length: number
}

export interface Store {
    id: number;
    name: string;
}

export interface IStatus {
    id: number;
    name: string;
}
export interface IAccessRight {
    id: number;
    access_name: string;
    access_store: IAccessStore;
}
export interface IAccessStore {
    id: number;
    name: string;
}



