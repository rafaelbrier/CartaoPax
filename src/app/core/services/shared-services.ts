import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() { }

    checkIfIsImage(fileInput: File) {
        let filePath = fileInput.name;
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            alert('Somente é possível enviar imagens com formatos .jpg, .jpeg, .png ou .gif.');
            return false;
        } else {
            return true;
        }
    }

    triggerValidation(formName: FormGroup) {
        Object.keys(formName.controls).forEach(field => {
          const control = formName.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      }
}


