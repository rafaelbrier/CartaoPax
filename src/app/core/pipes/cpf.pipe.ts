import { Pipe, PipeTransform } from '@angular/core';
import * as vanillaMasker from '../../../assets/js/vanilla-min.js';

@Pipe({
    name: 'cpf'
})
export class CpfPipe implements PipeTransform {
    private cpfPattern = '999.999.999-99';

    transform(value: string): string {
        if (!value) {
            return '';
        }
        return vanillaMasker.toPattern(value, this.cpfPattern);
    }
}