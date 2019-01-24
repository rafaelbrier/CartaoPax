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

    htmlToText(html: string) {
        //remove code brakes and tabs
        html = html.replace(/\n/g, "");
        html = html.replace(/\t/g, "");

        //keep html brakes and tabs
        html = html.replace(/<\/td>/g, "\t");
        html = html.replace(/<\/table>/g, "\n");
        html = html.replace(/<\/tr>/g, "\n");
        html = html.replace(/<\/p>/g, "\n");
        html = html.replace(/<\/div>/g, "\n");
        html = html.replace(/<\/h>/g, "\n");
        html = html.replace(/<br>/g, "\n");
        html = html.replace(/<br( )*\/>/g, "\n");
        html = html.replace(/<(?:.|\n)*?>/gm, '');    //conver HTML to Plain Text  

        return html;
    }
}


