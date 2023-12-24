import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders,HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable,  throwError as observableThrowError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Personnel } from '@app/_models/personnel.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<Personnel> ;
    public user: Observable<Personnel>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<Personnel>(JSON.parse(localStorage.getItem('user') as string));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): Personnel {
        return this.userSubject.value;
    }

  /**
   * refreshUserDetails
   */
   public refreshUser() {
    this.userSubject = new BehaviorSubject<Personnel>(JSON.parse(localStorage.getItem('user') as string));
    this.user = this.userSubject.asObservable();
    
  }
    login(login: string, password: string) {
      const body = new HttpParams()
        .set('userName', login)
        .set('password', password);
    const url = `${environment.oauthUrl}`;
      return this.http.post<any>(url+'login',
        body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(login + ':' + password);
                //user.tokenExpiresAt = new Date(new Date().getTime() + (1000 * user.expires_in));
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
         this.userSubject.next(null!);
        this.router.navigate(['/login']);
    }

    public handleError = (error: HttpErrorResponse) => {
      return observableThrowError(error.error);
      //return Observable.throwError(error.error);
   }
}