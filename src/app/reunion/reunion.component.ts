import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Enregistrement } from '@app/_models/enregistrement.model';
import { Ligne } from '@app/_models/ligne.model';
import { Processus } from '@app/_models/processus.model';
import { EnregistrementService } from '@app/_services/enregistrement.service';
import { LigneService } from '@app/_services/ligne.service';
import { StateManagementService } from '@app/_services/state-management.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
})

export class ReunionComponent implements OnInit {
//declarations
Lignes: Ligne[] = [];
selectLigne : Ligne =new Ligne();
processusList:Processus[]=[];
selectProcessus: Processus[]=[];

ParamEnragistrement : Enregistrement = new Enregistrement();
ResultEnragistrement : Enregistrement[]=[];
selectedEnregistrement: Enregistrement = new Enregistrement();

//form
myForm: FormGroup;
dateInf:FormControl;
dateSup:FormControl;
ligne : FormControl;
processus : FormControl;


//Dates
 time = new Date();
 selectedDateInf = new Date();
 selectedDateSup = new Date();
 numRows : number;

  constructor(private ligneService :LigneService,private enregistrementService:EnregistrementService,
    private confirmationService: ConfirmationService,private toastr: ToastrService,
    private router: Router, private _stateManager: StateManagementService){
    
 }

  ngOnInit() {

    this.numRows = 0;
    
    if(this.enregistrementService.selectedEnregistrement){
      this.selectedEnregistrement=this.enregistrementService.selectedEnregistrement;
      this.ligneService.getAllLigne().subscribe((data)=> {
        this.Lignes=data;
        this.selectLigne=  this.Lignes.filter(l=>l.id===this.selectedEnregistrement?.ligne_id)[0];
        this.fillListProcess(this.selectLigne);
      }) ;
      this.selectedDateInf = new Date(this.selectedEnregistrement?.dateEnregInf);
      this.selectedDateSup = new Date(this.selectedEnregistrement?.dateEnregSup);
      setTimeout(()=>{
        this.submit();
       },500);
    }
    else{
      this.ligneService.getAllLigne().subscribe((data)=> {
        this.Lignes=data;
      }) ;
    }

    this.createFormControls();
    this.createForm() ;
}

createFormControls() {
  this.dateInf =  new FormControl('',Validators.required);
  this.dateSup =  new FormControl('',Validators.required);
  this.ligne = new FormControl(this.selectLigne?this.selectLigne:'');
  this.processus = new FormControl(this.selectProcessus?this.selectProcessus:'');
}


createForm() {
this.myForm = new FormGroup({
  ligne: this.ligne,
  dateInf: this.dateInf,
  dateSup: this.dateSup,
  processus:this.processus,
});
}
clearprocessuList(){
  this.processusList= [];
  this.ParamEnragistrement.processus=[];
}
fillListProcess(ligne:Ligne){
  if(ligne!= null){
      this.ligneService.getProcessusByLigne(ligne).subscribe((data)=>{
          this.processusList = data;
          if(  this.selectedEnregistrement?.processus){
            this.processusList.forEach(pl=>{
              this.selectedEnregistrement.processus.forEach(p=>{
                if(p.processus.id==pl.id){
                  this.selectProcessus.push(pl);
                }
              });
            }); 
          }
      })
  }
  /* else{
      this.processusList= [];
  } */

  }

  reset(){
    this.ParamEnragistrement= new Enregistrement();
    this.ResultEnragistrement=[];
    this.selectedDateInf = new Date();
    this.selectedDateSup = new Date();
    //this.ParamEnragistrement.dateEnregInf="1970-01-01";
    //this.ParamEnragistrement.dateEnregSup="1970-01-01";
  }
  submit(){
    this.numRows = 0;
    this.ParamEnragistrement.dateEnregInf= this.selectedDateInf ?this.convertDate(this.selectedDateInf) : "";
    this.ParamEnragistrement.dateEnregSup=this.selectedDateSup ?this.convertDate(this.selectedDateSup):  "";
    this.ParamEnragistrement.ligne_id=this.selectLigne?.id? this.selectLigne.id : 0;
    if(this.selectProcessus != null){
      this.selectProcessus.forEach(p=>{
        this.ParamEnragistrement.processus_id.push(p.id);
      })
    }
      this.enregistrementService.getEnregistrement(this.ParamEnragistrement).subscribe(data =>{
      this.ResultEnragistrement=[];
    
      //tempEnrg.Ligne_nom = data.find()
      data.forEach(e=>{
        this.numRows =this.numRows+1;
        const tempEnrg = new Enregistrement();
        tempEnrg.id=e.id;
        tempEnrg.dateEnreg=e.dateEnreg;
        tempEnrg.heure_conv=e.heure.substring(11,16);
        tempEnrg.heure=e.heure;

        tempEnrg.Ligne_nom =e.processus[0]?.processus.ligne?.libelle;
        tempEnrg.processus_code="";
        tempEnrg.effets="";
        tempEnrg.personnel_nom_niv1="";
        tempEnrg.personnel_nom_niv2="";
        
        e.processus.forEach(p =>{
          tempEnrg.processus_code= tempEnrg.processus_code+"("+p.processus.code+") "+p.processus.libelle+" ; ";
        })
        tempEnrg.numReunion=e.numReunion;
        e.incident.incidents.forEach(ef=>{
          tempEnrg.effets=tempEnrg.effets+ef.effet.description+" ; ";
        })

        e.personnels.forEach(p=>{
          if(p.role=="niv1"){
            tempEnrg.personnel_nom_niv1=tempEnrg.personnel_nom_niv1+p.personnel.prenom+" "+p.personnel.nom+"; ";
          }
          if(p.role=="niv2"){
            tempEnrg.personnel_nom_niv2=tempEnrg.personnel_nom_niv2+p.personnel.prenom+" "+p.personnel.nom+"; ";
          }
        })
      
        tempEnrg.incident.probleme=e.incident.probleme;
        tempEnrg.incident.cause=e.incident.cause;
        tempEnrg.incident.actionCorrective=e.incident.actionCorrective;
        tempEnrg.dateCloture=e.dateCloture;
        tempEnrg.datePrevue=e.datePrevue;

        tempEnrg.processus=e.processus;
        tempEnrg.incident.incidents= e.incident.incidents;
        tempEnrg.personnels=e.personnels;
        tempEnrg.dateEnregInf=this.ParamEnragistrement.dateEnregInf;
        tempEnrg.dateEnregSup=this.ParamEnragistrement.dateEnregSup;
        tempEnrg.ligne_id=e.processus[0]?.processus.ligne?.id;
        //tempEnrg.processus_id
        this.ResultEnragistrement.push(tempEnrg);
      })
     
    });
    
  }

  convertDate(str: Date)  {
    var date = new Date(str),
    yyr = date.getFullYear(),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2)
    return [yyr,mnth,day].join("-");
}

edit(enregistrement : Enregistrement){
  this.enregistrementService.selectedEnregistrement=enregistrement
  this.router.navigate(['/reunion/validate']);
}

confirm(enregistrement:Enregistrement) {
  const conv_ky:string =enregistrement.id.toString();

  this.confirmationService.confirm({
    key: conv_ky,
    message: 'Êtes-vous sûr d\'effectuer cette action ?',
    
    accept: () => {
      this.enregistrementService.deleteEnregistrement(enregistrement.id).subscribe(() => {
        this.toastr.success('Réunion supprimée   avec succès', 'Succès!');
        this.submit();
      },
      (error) => {
          this.toastr.error('Une erreur se produit', 'Erreur!');
      })
    },
    reject: () => {
      this.toastr.warning('Pas de suppression', 'Pour info :');
    }
  });
}
}
