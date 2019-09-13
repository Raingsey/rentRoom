import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nullShow'
})
export class NullShowPipe implements PipeTransform {
    transform(value: any, args?: string): any {
        if (value) {
            return value;
        } else {
            if (args) {
                return args;
            } else {
                return '-';
            }
        }
    }

}
