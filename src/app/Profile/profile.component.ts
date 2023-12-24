import {Component, OnInit} from '@angular/core';
import {Personnel} from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { PersonnelService } from '@app/_services/personnel.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ChangePassword } from '@app/_models/change-password.model';
import { ToastrService } from 'ngx-toastr';

/**
 * The profile component
 */
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html' })

export class ProfileComponent implements OnInit {
  user: Personnel;
  myForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  confirmation: FormControl;
  changePasswordModel: ChangePassword;
  showLoader = false;
  compare: boolean;
  same: boolean;
  inchange: boolean;

  /**
   * Init
   */
  constructor(private authenticationService: AuthenticationService
            , private userService: PersonnelService,private toastr: ToastrService,
             ) {
    this.user = authenticationService.userValue;
    this.changePasswordModel =  new ChangePassword();
    this.changePasswordModel.userId = this.user.id;
  }

  /**
   * On init.
   */
  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
    this.createFormControls();
    this.createForm();
  }


  /**
   * create form controle
   */
  createFormControls() {
    this.oldPassword = new FormControl('', Validators.required);
    this.newPassword = new FormControl('',  Validators.required);
    this.confirmation = new FormControl('', Validators.required);
  }
  /**
   * create form validators
   */
  createForm() {
    this.myForm = new FormGroup({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmation: this.confirmation,
    });
  }

  /**
   * reset the form.
   */
  reset() {
    this.changePasswordModel = new ChangePassword();
  }

  /**
   * submit the form.
   */
  async submit() {
    
    if (this.user && this.user.id) {
      this.userService.changePassword(this.changePasswordModel).subscribe((usr) => {
          this.toastr.success('Mot de passe changé avec succès', 'Succès!');
          this.reset();
        }, (error) => {
          this.toastr.error('Une erreur se produit', 'Erreur!');
        });
    } 
  }

 
  /**
   * IS Valid current passWord.
   * return true is true
   */
  isValid() {
    return this.userService.checkPassword(this.changePasswordModel).subscribe((resultat) => {
      this.compare = resultat;
    }, () => {
     // this.showLoader = false;
    }); 
  }

  /**
   * in change Case old for New.
   */
  inchangeCase() {
    this.inchange = this.changePasswordModel.newPassword === this.changePasswordModel.oldPassword
    return this.inchange;
  }

  /**
   * in change Case old for New.
   */
  inSameCase() {
    this.same  = this.changePasswordModel.newPassword !== this.changePasswordModel.confirmation
    return this.same;
  }

  /**
   * checkPassword
   */

  checkPassword() {
    this.inSameCase();
    this.inchangeCase();
  }
}
