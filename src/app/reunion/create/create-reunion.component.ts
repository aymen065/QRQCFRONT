import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, RequiredValidator, Validators} from '@angular/forms';
import { LigneService } from '@app/_services/ligne.service';
import { Ligne } from '@app/_models/ligne.model';
import { Processus } from '@app/_models/processus.model';
import { EffetService } from '@app/_services/effet.service';
import { Effet } from '@app/_models/effet.model';
import { PersonnelService } from '@app/_services/personnel.service';
import { Service } from '@app/_models/service.model';
import { Personnel } from '@app/_models/personnel.model';
import { Enregistrement } from '@app/_models/enregistrement.model';
import { IncidentEffet } from '@app/_models/incident-effet.model';
import { Incident } from '@app/_models/incident.model';
import { EnregistrementService } from '@app/_services/enregistrement.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-reunion',
  templateUrl: './create-reunion.component.html',
})
export class CreateReunionComponent implements OnInit {

//declarations
Lignes: Ligne[] = [];
selectLigne : Ligne = new Ligne;
processusList:Processus[]=[];
selectProcessus: Processus[]=[];
effetList:Effet[]=[];
selecteffet: Effet[];
selectProbleme:string;
selectCause:string;
numero:number;
serviceList:Service[]=[];
selectService:Service[]=[];
personnelList:Personnel[]=[];
selectPersonnel:Personnel[]=[];
selectArticle:string;

//form
myForm: FormGroup;
dateReunion:FormControl;
heureReunion:FormControl;
ligne : FormControl;
processus : FormControl;
effet : FormControl;
probleme : FormControl;
cause : FormControl;
numeroReunion: FormControl;
service:FormControl;
personnel:FormControl;
article:FormControl;

//Dates
 time = new Date();
 date = new Date();

//created
createdEnreg: Enregistrement = new Enregistrement();

 constructor(private ligneService :LigneService, private effetService: EffetService,
    private personnelService:PersonnelService,private enregistrementService:EnregistrementService,
    private router: Router,private toastr: ToastrService){
    
 }

    ngOnInit() {
        this.createFormControls();
        this.createForm() ;
        this.ligneService.getAllLigne().subscribe((data)=> {
            this.Lignes=data;
        }) 
        this.effetService.getAllLigne().subscribe((data)=> {
            this.effetList = data;
        })
        this.personnelService.getAllServices().subscribe((data)=>{
            this.serviceList = data;
        })
        this.time.toLocaleString('fr-FR', { hour: 'numeric', hour12: true });
        this.date.toLocaleDateString('fr-FR',{ year: 'numeric',  month: "2-digit",day: 'numeric'}) ;
    }


    createFormControls() {
        this.dateReunion =  new FormControl('',Validators.required);
        this.heureReunion =  new FormControl('',Validators.required);
        this.ligne = new FormControl('',Validators.required);
        this.processus = new FormControl('',Validators.required);
        this.effet = new FormControl('',Validators.required);
        this.probleme =  new FormControl('',Validators.required);
        this.cause =  new FormControl('',Validators.required);
        this.numeroReunion = new FormControl('',Validators.required);
        this.service = new  FormControl('',Validators.required);
        this.personnel = new  FormControl('',Validators.required);
        this.article = new  FormControl('');
    }
    
    
    createForm() {
    this.myForm = new FormGroup({
        ligne: this.ligne,
        dateReunion: this.dateReunion,
        heureReunion: this.heureReunion,
        processus:this.processus,
        effet:this.effet,
        probleme:this.probleme,
        cause: this.cause,
        numeroReunion :this.numeroReunion ,
        service:this.service,
        personnel:this.personnel,
        article:this.article,
    });
    }

    fillListProcess(event:any){
        if(event.value!= null){
            this.enregistrementService.getLastNumLigne(this.selectLigne).subscribe(num=>{
                this.numero=num;
            })
            this.ligneService.getProcessusByLigne(event.value).subscribe((data)=>{
                this.processusList = data;
            })
        }else{
            this.processusList= [];
        }
       
    }
    fillListPersonnel(event:any){
        if(event.value!= null){
            this.personnelService.getPersonnelByService(event.value).subscribe((data)=>{
                this.personnelList= data;
            });
        }
    }
    clearpersonnelList(){
        this.personnelList= [] ;
    }
    back() {
        this.router.navigateByUrl('/reunion');
      }
      
      async submit(){
       
        /* get incident */
        const incident = new Incident();
        incident.probleme=this.selectProbleme;
        incident.cause=this.selectCause;
       
        /* get enregis */
        this.createdEnreg.incident=incident;
        this.createdEnreg.article=this.selectArticle;
        this.createdEnreg.dateEnreg=this.convertDate(this.date);
        this.createdEnreg.heure=this.convertDate(this.date)+'T'+this.convertTime(this.time);
        this.createdEnreg.numReunion=this.numero;
        //this.createdEnreg.param_role="niv1";
        this.enregistrementService.saveEnregistrement(this.createdEnreg,this.selecteffet,this.selectProcessus,this.selectPersonnel).subscribe((data)=>{
            this.toastr.success('Réunion ajoutée avec succès', 'Succès!');
            this.delay(2000).then(() => this.router.navigateByUrl('/reunion'));
        },
        (error) => {
            this.toastr.error('Une erreur se produit', 'Erreur!');
        this.delay(2000).then(() => this.router.navigateByUrl('/reunion/create'));
      }) 
       
      
    }

    convertTime(str: Date) {
        var date = new Date(str),
        hours  = ("0" + (date.getHours())).slice(-2),
        minutes = ("0" + date.getMinutes()).slice(-2),
        seconde = "00"
        return  [hours, minutes,seconde].join(":");
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
