
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Ligne } from '@app/_models/ligne.model';
import {environment} from '@environments/environment'
import { Processus } from '@app/_models/processus.model';


@Injectable({ providedIn: 'root' })
export class LigneService {
  private static URL_LIGNE = 'ligne';
  constructor(private http: HttpClient) {

  }

  getAllLigne() {
    return this.http.get<Ligne[]>(`${environment.apiUrl}${LigneService.URL_LIGNE}/listAll`);
  }

  getProcessusByLigne(ligne : Ligne) {
    return this.http.post<Processus[]>(`${environment.apiUrl}${LigneService.URL_LIGNE}/listProcessus`,ligne);
  }
}