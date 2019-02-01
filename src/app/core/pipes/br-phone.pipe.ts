import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'brphone'
})
export class BrPhoneFormatPipe implements PipeTransform {

    transform(value: string): string {

        if (!value) {
            return '';
        }

        let result = '';
        if (value.length > 10) {
            result = `(${value.substring(0, 2)}) ${value.substring(2,7)}-${value.substring(7)}`
        }else{
            result = `(${value.substring(0, 2)}) ${value.substring(2,6)}-${value.substring(6)}`
        }

        return result
    }

}