import { Time } from "@angular/common";
import { Enregistrement_Processus } from "./enregistrement-processus.model";
import { Enregistrement_Personnel } from "./enregitrement-personnel.model";
import { Incident } from "./incident.model";
import { Personnel } from "./personnel.model";
import { Processus } from "./processus.model";

export class Enregistrement{
    id : number;
    dateEnreg: string;
    datePrevue: string;
    dateCloture : string;
    heure: string;
   
    article:string;
    numReunion: number;
    incident:Incident;
    processus:Enregistrement_Processus[]=[];
    personnels: Enregistrement_Personnel[]=[];

    //divers
    dateEnregInf:string;
    dateEnregSup:string;

    ligne_id: number;
    Ligne_nom : string;
    processus_id: number[]=[];
    processus_code : string;
    effets: string;
    personnel_nom_niv1:string;
    personnel_nom_niv2:string;
    heure_conv:string;
    //param_role:string;

   constructor(incident?:Incident){
    this.incident =incident?incident: new Incident();
    this.processus = [];
   }
}