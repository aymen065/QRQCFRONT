import { Component } from '@angular/core';
import { Personnel } from '@app/_models/personnel.model';
import { PersonnelService } from '@app/_services/personnel.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {


    users: Personnel[];

    constructor(private userService: PersonnelService) { }

    ngOnInit() {
        
       /* this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });*/
    }
}
