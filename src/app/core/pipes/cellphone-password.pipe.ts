import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cellphonePassword'
})
export class CellphonePasswordPipe implements PipeTransform {

  transform(value: string): string {
    if(value) {
      if (value.includes('+1')) {
        return value.replace('+1', '');
       } else {
         return value;
       }
    } else {
      return ''
    }
  }

}
