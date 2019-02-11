import { Pipe, PipeTransform } from '@angular/core';
import * as vanillaMasker from '../../../assets/js/vanilla-min.js';

@Pipe({
  name: 'BRCurrencyPipe'
})
export class BRCurrencyPipe implements PipeTransform {

    transform(value: number): string {
        if (isNaN(value)) {
            return '';
        }
        if(!value) {
            value = 0.00;
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