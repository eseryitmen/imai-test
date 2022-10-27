import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'numerable';

@Pipe({
  name: 'shortNum'
})
export class ShortNumPipe implements PipeTransform {

  transform(value: number): string {    
    if (value < 1000) {
      return value.toString();
    }
    
    return format(value, '0.0a');
  }
}
