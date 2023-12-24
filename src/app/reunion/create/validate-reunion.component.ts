import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, RequiredValidator, Validators} from '@angular/forms';
import { LigneService } from '@app/_services/ligne.service';
import { EffetService } from '@app/_services/effet.service';
import { PersonnelService } from '@app/_services/personnel.service';
import { Service } from '@app/_models/service.model';
import { Personnel } from '@app/_models/personnel.model';
import { Enregistrement } from '@app/_models/enregistrement.model';
import { EnregistrementService } from '@app/_services/enregistrement.service';
import { ToastrService } from 'ngx-toastr';
import { StateManagementService } from '@app/_services/state-management.service';


@Component({
  selector: 'app-validate-reunion',
  templateUrl: './validate-reunion.component.html',
})
export class ValidateReunionComponent implements OnInit {

//declarations

selectActionCorrective:string;
serviceList:Service[]=[];
selectService:Service[]=[];
personnelList:Personnel[]=[];
selectPersonnel:Personnel[]=[];
i_service:number[]=[];
i_personnel:any;
//form
myForm: FormGroup;
datePrevue:FormControl;
dateCloture:FormControl;
actionCorrective : FormControl;
service:FormControl;
personnel:FormControl;


//Dates
selectedDateCloture: Date;
selectedDatePrevue : Date;

//created
createdEnreg: Enregistrement = new Enregistrement();
selectedEnregistrement:Enregistrement;

 constructor(private ligneService :LigneService, private effetService: EffetService,
    private personnelService:PersonnelService,private enregistrementService:EnregistrementService,
    private router: Router,private toastr: ToastrService, private _stateManager: StateManagementService){
    
 }

    ngOnInit() {
        
        if(this.enregistrementService.selectedEnregistrement){
            
            this.selectedEnregistrement=this.enregistrementService.selectedEnregistrement;
            this.personnelService.getAllServices().subscribe((data)=>{
                this.serviceList = data;
                 this.serviceList.forEach(sl=>{
                    this.selectedEnregistrement.personnels.forEach(ep=>{
                         if(ep.role=="niv2" && ep.personnel.service.id==sl.id){
                            this.i_service.push(ep.personnel.service.id);
                            this.selectPersonnel.push(ep.personnel);
                            //this.initPerso(this.selectPersonnel);
                         }
                     });
                     this.i_service=this.i_service.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
                     this.i_service.forEach(id=>{
                        if(id==sl.id){
                            this.selectService.push(sl);
                        }
                     })
                }); 
                this.fillListPersonnel(this.selectService);
            });
            this.selectActionCorrective=this.selectedEnregistrement?.incident?.actionCorrective;
            if(this.selectedEnregistrement.datePrevue==null){
                this.selectedDatePrevue=new Date();
            }else{
                this.selectedDatePrevue=new Date(this.selectedEnregistrement?.datePrevue);
            }
           if(this.selectedEnregistrement.dateCloture== null){
                this.selectedDateCloture=new Date(this.selectedDatePrevue.getFullYear(),this.selectedDatePrevue.getMonth(),this.selectedDatePrevue.getDate()+31);
           }else{
                this.selectedDateCloture = new Date(this.selectedEnregistrement?.dateCloture);
           }
          
        }else{
            this.back();
        }
        this.createFormControls();
        this.createForm() ;
        setTimeout(()=>{
           this.service.setValidators(Validators.required);
          },5000);
        
       // this.selectedDatePrevue.toLocaleDateString('fr-FR',{ year: 'numeric',  month: "2-digit",day: 'numeric'}) ;
        //this.selectedDateCloture.toLocaleDateString('fr-FR',{ year: 'numeric',  month: "2-digit",day: 'numeric'}) ;
    }


    createFormControls() {
        this.datePrevue =  new FormControl(this.selectedDatePrevue?this.selectedDatePrevue:'',Validators.required);
        this.dateCloture =  new FormControl(this.selectedDateCloture?this.selectedDateCloture:'',Validators.required);
        this.actionCorrective = new FormControl(this.selectActionCorrective?this.selectActionCorrective:'',Validators.required);
        this.service = new  FormControl( this.selectService? this.selectService:'');
        this.personnel = new  FormControl(this.selectPersonnel?this.selectPersonnel:'',Validators.required);
       
    }
    
    
    createForm() {
    this.myForm = new FormGroup({
        datePrevue: this.datePrevue,
        dateCloture: this.dateCloture,
        actionCorrective: this.actionCorrective,
        service:this.service,
        personnel:this.personnel,
    });
    }

   
    fillListPersonnel(selectService:Service[]){
      
        if(selectService!= null){
            this.personnelService.getPersonnelByService(selectService).subscribe((data)=>{
                this.personnelList= data;
                 if(this.personnelList!=null){
                    this.selectPersonnel=this.personnelList?.filter(({ id: id1 }) => this.selectPersonnel?.some(({ id: id2 }) => id2 === id1));
                } 
            });
        }
    }
    clearpersonnelList(){
        this.personnelList= [] ;
    }

    back() {
        this.router.navigateByUrl('/reunion');
      }

   /*  initPerso(selectPersonnel:Personnel[]){
    this.selectPersonnel=selectPersonnel;
    } */
      
      async submit(){
        this.createdEnreg.id=this.selectedEnregistrement.id;
        this.createdEnreg.datePrevue=this.convertDate(this.selectedDatePrevue);
        this.createdEnreg.dateCloture=this.convertDate(this.selectedDateCloture);
        this.createdEnreg.incident.actionCorrective=this.selectActionCorrective;
        
         this.enregistrementService.validationEnregistrement(this.createdEnreg,this.selectPersonnel).subscribe((data)=>{
            this.toastr.success('Réunion validée avec succès', 'Succès!');
            this.delay(2000).then(() => this.router.navigateByUrl('/reunion'));
        },
        (error) => {
            this.toastr.error('Une erreur se produit', 'Erreur!');
        this.delay(2000).then(() => this.router.navigateByUrl('/reunion/validate'));
      })  
     // console.log(this.selectPersonnel);
    }

    convertDate(str: Date)  {
        var date = new Date(str),
        yyr = date.getFullYear(),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2)
        return [yyr,mnth,day].join("-");
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

}
