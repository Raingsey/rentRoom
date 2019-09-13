
export interface Houses {
    id: number;
    house_name: string;
    note: string;
    province: Province;
    district: District;
    commune: Commune;
    village: Village;
    rent_type_id: number;
    created_by_id: number;
    owner: Owner;
}
export interface Owner {
    id: number;
    name_eng: string;
    name_kh: string;
}
export interface HouseType {
    id: number;
    name: string;
}
export interface Province {
    id: number;
    province: string;
    province_kh: string
}
export interface District {
    id: number;
    district: string;
    district_kh: string;
}
export interface Commune {
    id: number;
    commune: string;
    commune_kh: string;
}
export interface Village {
    id: number;
    village: string;
    village_kh: string;
}
export interface HousesObj {
    results: Houses[],
    length: number,
    response: Response
}
export interface UserFiller {
    user_id: number;
    name_eng: string;
}
