import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusShow'
})
export class StatusShowPipe implements PipeTransform {
    transform(value: any, args?: string): any {
        if (value === 1) {
            return 'Active'
        } else if (value === 2) {
            return 'In-Active'
        } else {
            return 'Close'
        }
    }

    showUserStatus(value: number): string {
        if (value === 1) {
            return 'Active';
        } else if (value === 2) {
            return 'In-Active';
        } else {
            return 'Close';
        }
    }
}
