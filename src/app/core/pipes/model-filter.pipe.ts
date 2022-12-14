import { Pipe, PipeTransform } from '@angular/core';
import * as lodash from 'lodash';

@Pipe({
  name: 'modelFilter',
  pure: false
})
export class ModelFilterPipe implements PipeTransform {

  transform(list: any[], make: string): any {
    let availableMakes: any = []
    var result = list.reduce((unique: any, o: any) => {
      if (!unique.some((obj: any) => obj.model_name === o.model_name)) {
        unique.push(o);
      }
      return unique;
    }, []);
    result.filter((c: any) => {
      if (c.model_make_id == make) {
        availableMakes.push(c.model_name)

      }
    });
    return availableMakes || [];
  }

}
