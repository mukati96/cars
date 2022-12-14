import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'trimFilter',
  pure: false
})
export class TrimFilterPipe implements PipeTransform {
  transform(list: any[], make: string, model: string): any {
    let trims: any = []
    var result = list.reduce((unique: any, o: any) => {
      if (!unique.some((obj: any) => obj.trim === o.trim)) {
        unique.push(o);
      }
      return unique;
    }, []);
    result.filter((c: any) => {
      if ((c.make.toLowerCase() === make.toLowerCase()) && (c.model.toLowerCase() === model.toLocaleLowerCase())) {
        trims.push(c.trim)

      }
    });
    return trims || [];
  }


}
