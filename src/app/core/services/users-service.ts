import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myConstants } from './constants';
import { TokenService } from './token-service';
import { SharedService } from './shared-services';
import { BehaviorSubject, Observable } from 'rxjs';

export class User {
  cpf: string;
  Expires_At: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private sharedService: SharedService) {

    this.currentUserSubject = new BehaviorSubject<User>(
      this.getUser() ? {cpf: this.getUser(), Expires_At: this.getExpiration()} : null
      );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private setCurrentUserValue(data: User): void {
      this.currentUserSubject.next(data);
  }

  signUp(data: any) {
    return this.http.post(myConstants.restBaseUrl + myConstants.signUpPath, {
      name: data.name,
      sex: data.sex,
      cpf: data.cpf,
      birthDate: data.birthDate,
      roles: { role: data.role }
    });
  }

  login(data: any) {
    let httpPost = this.http.post(myConstants.restBaseUrl + myConstants.loginPath, {
      username: data.username,
      password: data.password
    }, { responseType: 'text' });

    httpPost.subscribe(res => {
      let token = JSON.parse(`${res}`);
      this.setSession(token);
    }, () => { })

    return httpPost;
  }

  private setSession(token: any) {
    localStorage.setItem('Authentication', token.Authorization);
    localStorage.setItem("Expires_At", token.expirationTime);
    this.setCurrentUser();
  }

  logout() {
    localStorage.removeItem("Authentication");
    localStorage.removeItem("Expires_At");
    location.reload(true);
  }

  getExpiration() {
    return localStorage.getItem("Expires_At");
  }

  public isLoggedIn() {

    if (!localStorage.getItem("Authentication")) {
      return false;
    }

    if (this.sharedService.validateCpf(this.getUser())) {
      return true;
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

  public getUser() {
      const userCpf = this.tokenService.decodeToken(this.getToken());
      if (userCpf) {
        return userCpf.cpf;
      } else {
        return null;
      }
  }

  public getRole() {
    const role = this.tokenService.decodeToken(this.getToken());
      if (role) {
        return role.role;
      } else {
        return null;
      }
  }

  setCurrentUser() {
    if(!this.currentUserValue) {
      this.setCurrentUserValue(this.getUser() ? {cpf: this.getUser(), Expires_At: this.getExpiration()} : null);
    }
  }

}
