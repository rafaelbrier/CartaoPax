
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../core/services/users-service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private usersService: UsersService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.usersService.isLoggedIn()) {
            let expirationDate = new Date(this.usersService.getExpiration());
            let nowDate = new Date();

            if(nowDate.getTime() >= expirationDate.getTime()) {
                this.usersService.logout();
                this.router.navigate(['home']);
                return false;
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.usersService.logout();
        this.router.navigate(['home'], {queryParams: { returnUrl: state.url, userAuthorized: "false" }});
        return false;
    }
}