export interface ICustomer {
    id: number,
    first_name: string,
    last_name: string,
    gender: IGender,
    nationality: INationality,
    status: boolean,
    created_by: number,
    updated_by: number,
    customer_profiles: ICustomerProfile,
}

export interface ICustomerProfile {
    id: number;
    file_name: string;
    file_path: string;
    status: boolean;
}

export interface ICustomerObj {
    results: ICustomer[],
    length: number
}

export interface IGender {
    id: number,
    gender: string
}

export interface INationality {
    id: number,
    nationality: string
}
