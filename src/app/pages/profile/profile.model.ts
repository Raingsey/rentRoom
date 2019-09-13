import * as moment from 'moment';
import _date = moment.unitOfTime._date;
export interface Iprofile {
    id: number,
    product: string,
    price: number,
    description: string
    status: number
}

export interface IprofileObj {
    results: Iprofile[],
    length: number
}
