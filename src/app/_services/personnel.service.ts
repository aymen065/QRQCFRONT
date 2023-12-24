
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment'
import { Service } from '@app/_models/service.model';
import { Personnel } from '@app/_models/personnel.model';
import { AppRole } from '@app/_models/appRole.model';


@Injectable({ providedIn: 'root' })
export class PersonnelService {
  private static URL_PERSONNEL = 'personnel';
  constructor(private http: HttpClient) {

  }

  getAllServices() {
    return this.http.get<Service[]>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/listAllService`);
  }

  getPersonnelByService(service : Service[]) {
    return this.http.post<Personnel[]>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/listPersonnel`,service);
  } 

   /**
   * get connected User
   */
    getUser(user:any) {
      let reqHeader = new HttpHeaders();
      reqHeader = reqHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      reqHeader = reqHeader.append('Authorization',
        'Bearer ' + user.access_token);
      return this.http.get<Personnel>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/user`, {headers: reqHeader});
    }

    getAll() {
      return this.http.get<Personnel[]>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/listAllPersonnel`);
    }

    changePassword(user:any){
      return this.http.post<boolean>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/change-password`, user);
    }

    checkPassword(user:any) {
      return this.http.post<boolean>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/check-password`, user);
    }

    verifLogin(login: string){
      return this.http.get<boolean>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/validLogin?query=${login}`);
    }

    getRoles(){
      return this.http.get<AppRole[]>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/listRole`);
    }

    addUser(user: Personnel) {
      return this.http.post<Personnel>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/create`, user);
    }
    updatePass(user: Personnel){
      return this.http.post<Personnel>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/update-password`, user);
    }

    update(user: Personnel){
      return this.http.post<Personnel>(`${environment.apiUrl}${PersonnelService.URL_PERSONNEL}/update`, user);
    }
}