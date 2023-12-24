
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment'
import { Effet } from '@app/_models/effet.model';


@Injectable({ providedIn: 'root' })
export class EffetService {
  private static URL_EFFET = 'effet';
  constructor(private http: HttpClient) {

  }

  getAllLigne() {
    return this.http.get<Effet[]>(`${environment.apiUrl}${EffetService.URL_EFFET}/listAll`);
  }
}