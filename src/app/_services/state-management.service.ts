import {Injectable} from '@angular/core';
import { Enregistrement } from '@app/_models/enregistrement.model';

/** Manage shared states between component and service throw the app */
@Injectable({providedIn: 'root'})
export class StateManagementService {
    private _state: {
        previousURI: string,
        selectedEnregistrement:Enregistrement,
        previousPages: string[],
        pageIndex:number,
        isUser: boolean,
    }
    constructor() {
        this._state = {
            previousURI: '',
            selectedEnregistrement: new Enregistrement(),
            previousPages: [],
            pageIndex:-1,
            isUser: false,
        };
    }
    get state(): any {
        return this._state;
    }
    
    set state(value: any) {
    this._state = value;
    }
    resetState() {
        this._state = {
            previousURI: '',
            selectedEnregistrement: new Enregistrement(),
            previousPages: [],
            pageIndex:-1,
            isUser: false,
        }
    }
    /**
   * reset the state.
   */
  previous() {
    let toret  =this._state.previousPages ;
    toret.pop();
   
    let pageIn = this._state.pageIndex - 1 ;
     // @ts-ignore
    this._state = {
        previousURI: '',
        selectedEnregistrement: new Enregistrement(),
        previousPages: toret,
        pageIndex:-1,
        isUser: false,
    };
}
}