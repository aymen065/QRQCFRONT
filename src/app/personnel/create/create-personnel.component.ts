import { Component, OnInit } from "@angular/core";
import { FormGroup,FormControl, Form, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Personnel } from "@app/_models";
import { AppRole } from "@app/_models/appRole.model";
import { Service } from "@app/_models/service.model";
import { PersonnelService } from "@app/_services/personnel.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-create-personnel',
    templateUrl: './create-personnel.component.html',
  })
  export class CreatePersonnelComponent implements OnInit {

    // Model
    user: Personnel = new Personnel();

    myForm: FormGroup;
    login: FormControl;
    nom: FormControl;
    prenom: FormControl;
    service: FormControl;
    roles: FormControl;
    password: FormControl;
    confirmation: FormControl;


    resLogin:Boolean;
    ListAppRole: AppRole[]=[];
    passMatch : Boolean;
    serviceList:Service[]=[];
   

    constructor( private router: Router,
        private personnelService: PersonnelService,
        private toastr: ToastrService){
        
    }
    
    ngOnInit() {
       
        this.createFormControls();
        this.createForm() ;
        this.getRoles();
        this.personnelService.getAllServices().subscribe((data)=>{
            this.serviceList = data;
        })
    }
    back() {
        this.router.navigateByUrl('/personnel');
    }
    createFormControls(){
        this.login=new FormControl(this.user.login, Validators.required);
        this.nom=new FormControl(this.user.nom, Validators.required);
        this.prenom=new FormControl(this.user.prenom, Validators.required);
        this.service = new  FormControl(this.user.service,Validators.required);
        this.roles=new FormControl(this.user.appRoles, Validators.required);
        this.password=new FormControl(this.user.password, Validators.required);
        this.confirmation=new FormControl(this.user.confirmPassword, Validators.required);
    }
    createForm(){
        this.myForm = new FormGroup({
            login: this.login,
            nom: this.nom,
            prenom :this.prenom,
            service:this.service,
            roles:this.roles,
            password:this.password,
            confirmation:this.confirmation
        });
    }

    verificationLogin(){
      return  this.personnelService.verifLogin(this.user.login).subscribe(res => {
            this.resLogin=res;
        });
    }

    getRoles(){
        this.personnelService.getRoles().subscribe(roles => {
            this.ListAppRole=roles;
        })  
    }

    checkPass() {
        this.passMatch = this.user.password === this.user.confirmPassword;
      }
    reset() {
    this.myForm.reset();
    }
    
    submit(){
        //console.log(this.user);
        this.personnelService.addUser(this.user).subscribe(() => {
        this.toastr.success('Personnel ajoutée avec succès', 'Succès!');
          this.user = new Personnel();
          this.reset();
        }, (err) => {
            this.toastr.error('Une erreur se produit', 'Erreur!');
        });
    }
  }