import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToHour'
})
export class TimeToHourPipe implements PipeTransform {
  transform(value: string, args: any[]): any {
    const numminutes = Math.floor(+value % 60);
    const numhours = Math.floor((+value - numminutes) / 60);
    return (numhours < 10 ? '0' + numhours : numhours) + ':' + (numminutes < 10 ? '0' + numminutes : numminutes);
  }
}
