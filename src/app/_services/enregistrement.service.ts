
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import { Enregistrement } from '@app/_models/enregistrement.model';
import { Effet } from '@app/_models/effet.model';
import { Processus } from '@app/_models/processus.model';
import { Personnel } from '@app/_models/personnel.model';
import { Ligne } from '@app/_models/ligne.model';


@Injectable({ providedIn: 'root' })

export class EnregistrementService {
  selectedEnregistrement:Enregistrement;
  private static URL_ENREG = 'enregistrement';
  constructor(private http: HttpClient) {

  }

  saveEnregistrement(enregistrement:Enregistrement,effet:Effet[],processus:Processus[],personnel:Personnel[]) {
    return this.http.post<Enregistrement>(`${environment.apiUrl}${EnregistrementService.URL_ENREG}/createEnreg`,{enregistrement,effet,processus,personnel});
  }

  validationEnregistrement(enregistrement:Enregistrement,personnel:Personnel[]) {
    return this.http.post<Enregistrement>(`${environment.apiUrl}${EnregistrementService.URL_ENREG}/validateEnreg`,{enregistrement,personnel});
  }

  getLastNumLigne(ligne:Ligne){
    return this.http.post<number>(`${environment.apiUrl}${EnregistrementService.URL_ENREG}/getLastNum`,ligne);
  }

  getEnregistrement(enregistrement:Enregistrement) {
    return this.http.post<Enregistrement[]>(`${environment.apiUrl}${EnregistrementService.URL_ENREG}/getEnreg`,enregistrement);
  }

  deleteEnregistrement(id: number) {
    return this.http.delete(`${environment.apiUrl}${EnregistrementService.URL_ENREG}/deleteOneEnreg/${id}`);
  }
}