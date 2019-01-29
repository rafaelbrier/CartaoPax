import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myConstants } from './constants';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  signUp(data: any) {
    let httpPost = this.http.post(myConstants.restBaseUrl + myConstants.signUpPath, {
      name: data.name,
      sex: data.sex,
      cpf: data.cpf,
      birthDate: data.birthDate,
      roles: {role: data.role}
    }).subscribe(res => {console.log("res",res), err => console.log("err",err)}) 
  }

  login(data: any) {

    let httpPost = this.http.post(myConstants.restBaseUrl + myConstants.loginPath, {
      username: data.username,
      password: data.password
    }, { responseType: 'text' });

    httpPost.subscribe(res => {
      let token = JSON.parse(`${res}`);
      this.setSession(token);
    }, err => { })
    return httpPost;
  }

  private setSession(token: any) {
    // localStorage.setItem('Authentication', token.Authorization);
    localStorage.setItem('Authentication', token.Authorization.split("Bearer ").pop());
    localStorage.setItem("Expires_At", token.expirationTime);
  }

  logout() {
    localStorage.removeItem("Authentication");
    localStorage.removeItem("Expires_At");
  }

  getExpiration() {
    return localStorage.getItem("Expires_At");
  }

  public isLoggedIn() {
    if (localStorage.getItem("Authentication").length > 2) {
      return true
    } else {
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getToken() {
    return localStorage.getItem("Authentication");
  }

}
