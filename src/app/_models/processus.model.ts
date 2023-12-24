import { Ligne } from "./ligne.model";

export class Processus{
    id: number;
    code: string;
    libelle:string;
    ligne:Ligne;

    constructor() {
        this.ligne = new Ligne();
      }
}