import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getName'
})
export class GetNamePipe implements PipeTransform {

    transform(value: any, fieldSearch: string, valueSearch: any, fieldReturn: string): string {
        if (value && fieldSearch && valueSearch && fieldReturn) {
            return value.find(x => x[fieldSearch] === valueSearch)[fieldReturn];
        }
        return '';
    }

}
