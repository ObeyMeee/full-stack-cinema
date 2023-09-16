import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(length: number, offset: number = 0) {
    return !length ? [] :
      [...Array(length).keys()].map(i => i + offset);
  }
}
