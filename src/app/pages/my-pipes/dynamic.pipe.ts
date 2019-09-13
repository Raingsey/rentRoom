import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe extends DatePipe implements PipeTransform {

    transform(value: any, modifier: string) {
        if (!modifier) {
            return value;
        }
        // Evaluate pipe string
        return eval('this.' + modifier + '(\'' + value + '\')');
    }
    date(value: string): string {
        if (value !== 'null') {
            return super.transform(value, 'MMM dd, yyyy');
        } else {
            return null;
        }
    }
    dateTime(value: string): string {
        if (value !== 'null') {
            return super.transform(value, 'MMM dd, yyyy hh:mm:ss a');
        } else {
            return null;
        }
    }
    currencyFormat(value: any): String {
        if (value !== undefined && value !== null) {
            return value.toLocaleString();
        } else {
            return '';
        }
    }

    dateSimfoni(value: string): string {
        if (value !== 'null') {
            return super.transform(value, 'dd-MM-yyyy');
        } else {
            return null;
        }
    }

    dateTimeSimfoni(value: string): string {
        if (value !== 'null') {
            return super.transform(value, 'dd-MM-yyyy HH:mm:ss a');
        } else {
            return null;
        }
    }
}
