import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { myConstants } from './constants';


@Injectable({
    providedIn: 'root'
})
export class PlanosService {

    constructor(private http: HttpClient){}

    findAll() {
        return this.http.get(myConstants.restBaseUrl + myConstants.planos);
    }
}