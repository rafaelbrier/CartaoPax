import { FormControl } from '@angular/forms';

export const whiteSpace = function(formControl: FormControl) {
  let regex = /^\S/;
  
  if(formControl.value)
  return regex.test(formControl.value) ? null : {whiteSpace: true};
}