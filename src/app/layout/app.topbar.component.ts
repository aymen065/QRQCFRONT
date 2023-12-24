import { Component, ElementRef, ViewChild,OnInit,OnDestroy } from '@angular/core';
import { Personnel } from '@app/_models/personnel.model';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit, OnDestroy{

    //items!: MenuItem[];
    tieredItems!: MenuItem[];

    user : Personnel;
    subscription: Subscription;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private confirmationService: ConfirmationService,
        private authenticationService: AuthenticationService) { }
    
    ngOnInit() {

        this.user = this.authenticationService.userValue;
    }
    /**
   * on destroy
   */
  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
   /**
   * logout.
   */
    logout() {
        this.authenticationService.logout();
    }

    confirm() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Voulez-vous déconnecter?',
            acceptLabel:"Oui",
            rejectLabel:"Non",
            accept: () => {
                this.logout();
            }
        });
    }
}
