import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedServices {

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
}
