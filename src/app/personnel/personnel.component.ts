import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Personnel } from '@app/_models/personnel.model';
import { PersonnelService } from '@app/_services/personnel.service';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
})
export class PersonnelComponent {

    passMatch : Boolean;
    users: Personnel[];
    selectedUser: Personnel;
    display = false;
    myForm : FormGroup;
    newPassword : FormControl;
    confirmPassword : FormControl;
   

    constructor(private userService: PersonnelService,
      private toastr: ToastrService) { 

      this.selectedUser = new Personnel();

    }

  ngOnInit() {
      this.createFormControls();
      this.createForm();
      this.search();
  }

  
  createFormControls() {
    this.newPassword = new FormControl(this.selectedUser.password,  Validators.required);
    this.confirmPassword = new FormControl(this.selectedUser.confirmPassword, Validators.required);
  }

  search(){
    this.userService.getAll().subscribe(all => {
      this.users=all;
     });
  }
  createForm() {
    this.myForm = new FormGroup({
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    });
  }

    showDialog(user : Personnel) {
      this.selectedUser = user;
      this.selectedUser.password = '';
      this.display = true;
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('p-dialog-active');
    }

    closeDialog() {
      this.display = false;
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('p-dialog-active');
      this.myForm.reset();
    }

    checkPass() {
      this.passMatch = this.selectedUser.password === this.selectedUser.confirmPassword;
    }

    
    updatePass(){
      this.userService.updatePass(this.selectedUser).subscribe(() => {
        this.toastr.success('Mot de passe modifiée avec succès', 'Succès!');
        this.search();
        }, (err) => {
            this.toastr.error('Une erreur se produit', 'Erreur!');
        }, ()=> this.closeDialog());
    }

    async lockUserAccount(user: Personnel) {
      user.locked = true;
      user.active = false;
      //await this.userService.update(user).toPromise();
      await lastValueFrom( this.userService.update(user));
      this.search();
    }
  
    /** unlockUserAccount */
    async unlockUserAccount(user: Personnel) {
      user.active = true;
      user.locked = false;
     // await this.userService.update(user).toPromise();
     await lastValueFrom( this.userService.update(user));
      this.search();
    }
}
