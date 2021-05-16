import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  private async timeCalculate(millisecond: number): Promise<string> {
    const _seconds = Math.floor((millisecond / 1000) % 60);
    const _minutes = Math.floor((millisecond / (1000 * 60)) % 60);
    const _hours = Math.floor((millisecond / (1000 * 60 * 60)) % 24);

    const hours = (_hours < 1) ? '' : _hours + ':';
    const minutes = (_minutes < 10) ? "0" + _minutes : _minutes;
    const seconds = (_seconds < 10) ? "0" + _seconds : _seconds;

    return hours + minutes + ":" + seconds;
  }


  async transform(value: any, ...args: unknown[]): Promise<String> {
    const time: string = await this.timeCalculate(value * 1000)
    return time;
  }

}
