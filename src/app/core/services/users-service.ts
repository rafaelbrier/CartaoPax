import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myConstants } from './constants';
import { TokenService } from './token-service';
import { SharedService } from './shared-services';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export class User {
  id: string;
  name: string;
  imgProfile: string;
  cpf: string;
  Expires_At: string;
}

export interface userData {
  id?: string,
  name: string,
  cpf: string,
  imgProfile: string,
  telephone: string,
  telephoneOp: string,
  email: string,
  escolaridade: string,
  cep: string,
  endereco: string,
  numero: string,
  bairro: string,
  estado: string,
  cidade: string,
  complemento: string,
  sex: string,
  birthDate: string,
  roles: { id: number, name?: string },
  planos: { id: number, name?: string },
  planPrice: number,
  active?: boolean
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
      this.getUser() ? {
        id: this.getId(),
        name: this.getName(), imgProfile: this.getImgProfile(),
        cpf: this.getUser(), Expires_At: this.getExpiration()
      } : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private setCurrentUserValue(data: User): void {
    this.currentUserSubject.next(data);
  }

  findUserByCpf(Cpf: string) {
    return this.http.get(`${myConstants.restBaseUrl}${myConstants.usersPath}?searchTerm=${Cpf}`)
  }

  findUserById(id: string) {
    return this.http.get(`${myConstants.restBaseUrl}${myConstants.usersPath}/${id}`);
  }

  findAllPageable(page: number, size: number, sort: String, order: String, searchTerm: string = '', showDesactivated: boolean = false) {
    return this.http.get(`${myConstants.restBaseUrl}${myConstants.usersPath}?page=${page}&size=${size}&sort=${sort},${order}&searchTerm=${searchTerm}&showDesactivated=${showDesactivated}`);
  }

  signUp(data: userData) {
    return this.http.post(myConstants.restBaseUrl + myConstants.signUpPath, data);
  }

  activateOrDesactivate (userId: string) {
    return this.http.post(`${myConstants.restBaseUrl}${myConstants.usersPath}${myConstants.activateOrDesactivatePath}`, userId);
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

  public getId() {
    const payload = this.getTokenPayload();
    if (payload) {
      return payload.id;
    } else {
      return null;
    }
  }

  public getImgProfile() {
    const payload = this.getTokenPayload();
    if (payload) {
      return payload.imgProfile;
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
      return payload.name;
    } else {
      return null;
    }
  }

  private setCurrentUser() {
    if (!this.currentUserValue) {
      this.setCurrentUserValue(this.getUser() ? { 
        id: this.getId(),
        name: this.getName(), imgProfile: this.getImgProfile(),
        cpf: this.getUser(), Expires_At: this.getExpiration()  
       } : null);
    }
  }

  private unsetCurrentUser() {
    if (this.currentUserValue) {
      this.setCurrentUserValue(null);
    }
  }

  public delete(userId: String) {
    return this.http.delete(`${myConstants.restBaseUrl}${myConstants.usersPath}/${userId}`);
  }

}
