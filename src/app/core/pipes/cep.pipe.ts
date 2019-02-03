import { Pipe, PipeTransform } from '@angular/core';
import * as vanillaMasker from '../../../assets/js/vanilla-min.js';

@Pipe({
    name: 'cep'
})
export class CepPipe implements PipeTransform {
    private cepPattern = '99999-999';

    transform(value: string): string {
        if (!value) {
            return '';
        }
        return vanillaMasker.toPattern(value, this.cepPattern);
    }
}