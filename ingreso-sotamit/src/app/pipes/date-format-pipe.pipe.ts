import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe',
  standalone: true
})
export class DateFormatPipePipe implements PipeTransform {


  transform(value: any, ...args: any[]): any {
    if (!value) return value; 

    const date = new Date(value);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
