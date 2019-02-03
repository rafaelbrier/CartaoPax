import {Pipe, PipeTransform} from '@angular/core';
import * as vanillaMasker from '../../../assets/js/vanilla-min.js';

@Pipe({
  name: 'brphone',
})
export class BrPhoneFormatPipe implements PipeTransform {
   private telefoneFixoPattern = '(99) 9999-9999';
   private telefoneCelularPattern = '(99) 99999-9999';

  transform(value: any) {
    if (!value) {
      return '';
    } 
    const telefonePattern: string = value.toString().length === 14 ? this.telefoneFixoPattern : this.telefoneCelularPattern;
    return vanillaMasker.toPattern(value, telefonePattern);
  }
}