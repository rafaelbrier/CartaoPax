import { Pipe, PipeTransform } from '@angular/core';
import * as vanillaMasker from '../../../assets/js/vanilla-min.js';

@Pipe({
    name: 'MyDate'
})
export class MyDatePipe implements PipeTransform {
    private datePattern = '99/99/9999';

    transform(value: string): string {
        if (!value) {
            return '';
        }
        return vanillaMasker.toPattern(value, this.datePattern);
    }
}