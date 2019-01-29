import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UsersService } from '../core/services/users-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private usersService: UsersService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && err.error != "Invalid username or password.") {
                
                this.usersService.logout();
            }

            return throwError(err);
        }))
    }
}