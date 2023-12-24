// tslint:disable-next-line:max-line-length
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import {catchError, mergeMap, map, tap} from 'rxjs/operators';
import {AuthenticationService} from '@app/_services/authentication.service';



/**
 * The Authentification interceptor
 */
@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthenticationService) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.userValue;
           
            // new Date() < new Date(user.tokenExpiresAt) 
           
        if (user != null  &&  user.expires_in * 1000 > new Date().getTime() && !req.headers.get('Authorization')) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + user.access_token),
            });
        } 
        else if (user == null){
            this.router.navigateByUrl('/login');
            return next.handle(req.clone());
        }
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
          
          if (err.status === 401 || err.status === 403 ||  err.error === 'invalid_grant' || err.error === 'unauthorized' || err.error === 'access_denied' || err.error === 'invalid_token') {
              this.authService.logout();
              return this.authService.handleError(err);
            } 
            else {
              return this.authService.handleError(err);
            }
          },
            ),
            // We could check the type of object/error to show
            // in our case to send error from backend to front
            tap( () => { },
              () => {
                return next.handle(req.clone());
              },
              )) as any; 
    }
 }
