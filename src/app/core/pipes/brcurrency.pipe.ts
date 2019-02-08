import { Pipe, PipeTransform } from '@angular/core';
import * as vanillaMasker from '../../../assets/js/vanilla-min.js';

@Pipe({
  name: 'BRCurrencyPipe'
})
export class BRCurrencyPipe implements PipeTransform {

    transform(value: number): string {
        if (isNaN(value)) {
          console.log(value)
            return '';
        }

        return vanillaMasker.toMoney(value,
         {
         precision: 2,
         separator: ',',
         delimiter: '.',
         unit: 'R$',
         zeroCents: true
        });
    }

}