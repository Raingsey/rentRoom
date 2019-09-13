import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deepList'
})
export class DeepListPipe implements PipeTransform {

  transform(value: any, field: string): any {
    if (field) {
      const arr = field.split('.');
      switch (arr.length) {
          case 1:
              return value[field];
          case 2:
              return value[arr[0]][arr[1]];
          case 3:
            return value[arr[0]][arr[1]][arr[2]];
          default:
            return '';
      }
    }
    return '';
  }

}
