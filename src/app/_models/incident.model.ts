import { Enregistrement } from "./enregistrement.model";
import { IncidentEffet } from "./incident-effet.model";

export class Incident{
    id : number;
    probleme : string;
    cause : string;
    actionCorrective : string;
    incidents : IncidentEffet[];
}