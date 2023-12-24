import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Personnel } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    user : Personnel;

    constructor(public layoutService: LayoutService,private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = this.authenticationService.userValue;
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
                    { label: 'Reunion', icon: 'pi pi-fw pi-users', routerLink: ['/reunion'] }
                ]
            },
           
        ];
        if( this.user.appRoles.filter(r=> r.roleName == "SUPER").length != 0){
            this.model.forEach(m =>{
                m.items.push( { label: 'Personnel', icon: 'pi pi-fw pi-id-card', routerLink: ['/personnel'] })
            })
        }
    }
}
