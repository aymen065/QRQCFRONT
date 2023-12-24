import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { PersonnelService } from '@app/_services/personnel.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
   // loading = false;
    submitted = false;
    returnUrl: string;
    login:FormControl;
    pwd:FormControl;
    erreur = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private personnelService: PersonnelService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.userValue) { 
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm() ;

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }
    createFormControls() {     
        this.login =  new FormControl('',Validators.required);
        this.pwd =  new FormControl('',Validators.required);
    }
    createForm() {
        this.loginForm = new FormGroup({
            login: this.login,
            pwd: this.pwd,
        });
    }

    clearError(){
        this.erreur='';
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

       // this.loading = true;
        this.authenticationService.login(this.login.value,this.pwd.value)
            .pipe(first())
            .subscribe(
                data => {
                   // console.log( JSON.parse(atob(data.access_token.split('.')[1])));
                    const decode =JSON.parse(atob(data.access_token.split('.')[1]));
                      return this.personnelService.getUser(data).subscribe((usr) => {
                        data.prenom = usr.prenom;
                        data.nom = usr.nom;
                        data.appRoles = usr.appRoles;
                        data.id = usr.id;
                        data.userName = usr.userName;
                        data.username = usr.userName;
                        data.service = usr.service;
                        data.expires_in = decode.exp;
                        //data.tokenExpiresAt = new Date(new Date().getTime() + (1000 * decode.exp));
                        localStorage.setItem('user', JSON.stringify(data));
                        this.authenticationService.refreshUser();
                        this.router.navigate([this.returnUrl]);
                      });
                    
                     // this.authenticationService.refreshUser();
                },
                error => {
                    //this.erreur =error ;
                    this.erreur='Utilisateur ou mot de passe incorrect';
                });
    }
}
