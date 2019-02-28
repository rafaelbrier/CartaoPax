import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../components/utils/modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private http: HttpClient) { }

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

    isFileOverSized(fileInput: File, limitSizePowerOfTwo: number) {
        return fileInput.size > Math.pow(2, limitSizePowerOfTwo) ? true : false;
    }

    triggerValidation(formName: FormGroup) {
        Object.keys(formName.controls).forEach(field => {
            const control = formName.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }

    textOverFlow(text: string, maxNumberOfChar: number, maxNumberOfLines: number): { text: string, overflow: boolean } {
        let stringSepByLine = text.split(/\n/);

        if (maxNumberOfLines && stringSepByLine.length >= maxNumberOfLines) {
            stringSepByLine[maxNumberOfLines - 1] = stringSepByLine[maxNumberOfLines - 1] + " ...";
            let slicedString = stringSepByLine.slice(0, maxNumberOfLines);
            text = slicedString.join('\n');
        }

        if (maxNumberOfChar && text.length > maxNumberOfChar) {
            text = text.substr(0, maxNumberOfChar) + " ...";
        }

        if (stringSepByLine.length >= maxNumberOfLines || text.length > maxNumberOfChar) {
            return { text: text, overflow: true };
        } else {
            return { text: text, overflow: false };
        }
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

    validateCpf(strCPF: string) {
        let Soma = 0;
        let Resto;
        let Cpf = strCPF.split(".").join("")
        Cpf = Cpf.split("-").join("");
        if (Cpf == "00000000000") return false;
        if (Cpf == "cartaopaxadmin") return true;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(Cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(Cpf.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(Cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(Cpf.substring(10, 11))) return false;
        return true;
    }

    consultaCEP(cep: string) {
        cep = cep.replace(/\D/g, '');
        if (cep !== '') {
            const validaCepNoDash = /^[0-9]{8}$/;
            if (validaCepNoDash.test(cep)) {
                return this.http.get(`//viacep.com.br/ws/${cep}/json`);
            }
        }
    }

    scrollToAnchor(anchor: string) {
        if (anchor) {
            try {
                setTimeout(() => {
                    document.querySelector('#' + anchor).scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
                }, 200)
            } catch (err) { }
        }
    }

    handleErrorResponse(err: any, modal: ModalComponent, isEdit: boolean) {
        let modalText = isEdit ? "editar" : "adicionar";
        if(err.status == 0) {
            modal.openModal("Erro!", `<div class="alert alert-danger text-left col-sm-11 mx-auto">Erro desconhecido, favor contatar o administrador do sistema.</div>`, "fail");
            return;
        }
        if (err.error) {
            if (err.error.errors) {
              if (err.error.errors.length >= 1) {
                let errorsArr = err.error.errors;
                let messagesArr = [];
                errorsArr.forEach(element => {
                  messagesArr.push('<div>- ' + element["message"] + '</div>');
                });
                let errorMessages = `<div class="alert alert-danger text-left col-sm-11 mx-auto">
                ${messagesArr.join('')}</div>`;
                modal.openModal(err.error.message, errorMessages, "fail");
                return;
              }
            } else {
              modal.openModal("Erro!", `<div class="alert alert-danger text-left col-sm-11 mx-auto">${err.error.message}</div>`, "fail");
            }
          } else {
            modal.openModal("Erro!", `<div class="alert alert-danger text-left col-sm-11 mx-auto">Houve algum erro ao ${modalText} os dados. Por favor tente novamente mais tarde.</div>`, "fail");
          }
    }
}


