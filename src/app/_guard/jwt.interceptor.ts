import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../core/services/users-service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private usersService: UsersService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.usersService.getUser();
        const currentUserToken = this.usersService.getToken();
        if (currentUser && currentUserToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUserToken}`
                }
            });
        }

        return next.handle(request);
    }
}