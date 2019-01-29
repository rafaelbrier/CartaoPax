import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myConstants } from './constants';
import { TokenService } from './token-service';
import { SharedService } from './shared-services';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    private sharedService: SharedService,
    private router: Router) {

    this.currentUserSubject = new BehaviorSubject<User>(
      this.getUser() ? { cpf: this.getUser(), Expires_At: this.getExpiration() } : null
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
    this.unsetCurrentUser();
    this.router.navigate(['home']);
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

  private getTokenPayload() {
    return this.tokenService.decodeToken(this.getToken());
  }

  public getUser() {
    const payload = this.getTokenPayload();
    if (payload) {
      return payload.cpf;
    } else {
      return null;
    }
  }

  public havePermission(Role: String) {
    let userRole = this.getRole();

    if (userRole) {
      switch (userRole) {
        case "ADMIN":
          return true;
        case "EMPLOYEE":
          return Role === "ADMIN" ? false : true;
        case "CLIENT":
          return Role === "ADMIN" || Role === "EMPLOYEE" ? false : true;
        default:
          return false;
      }
    } else {
      return false;
    }

  }

  public getRole() {
    const payload = this.getTokenPayload();
    if (payload) {
      return payload.role;
    } else {
      return null;
    }
  }

  public getName() {
    const payload = this.getTokenPayload();
    if (payload) {
      return payload.role;
    } else {
      return null;
    }
  }

  private setCurrentUser() {
    if (!this.currentUserValue) {
      this.setCurrentUserValue(this.getUser() ? { cpf: this.getUser(), Expires_At: this.getExpiration() } : null);
    }
  }

  private unsetCurrentUser() {
    if (this.currentUserValue) {
      this.setCurrentUserValue(null);
    }
  }

}
