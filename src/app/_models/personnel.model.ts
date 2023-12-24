import { AppRole } from "./appRole.model";
import { Service } from "./service.model";

export class Personnel {
    id : number;
    nom : string= '';
    prenom: string= '';
    service: Service;

    login: string; 
    userName: string; // This column is used in the backend
    password: string;
    fullName = this.nom + ' ' + this.prenom;
    authdata?: string;
    access_token?: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
   // failedLoginAttempts: number;
    tokenExpiresAt: Date;
    //roles: string;
    locked: boolean;
    active:boolean;
    state: string;
    appRoles: AppRole[];
    confirmPassword: string;
  
    
    constructor() {
        this.service= new Service();
        this.locked = false;
        this.active = true;
    }

}