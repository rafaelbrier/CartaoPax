import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { myConstants } from './constants';


@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private http: HttpClient){}

    findAll() {
        return this.http.get(myConstants.restBaseUrl + myConstants.roles);
    }
}