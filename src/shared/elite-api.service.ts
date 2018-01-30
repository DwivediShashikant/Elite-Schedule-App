import { Injectable } from "@angular/core";
import { Http} from  "@angular/http"

@Injectable()
export class EliteApiService{

    private baseUrl = 'https://elite-schedule-app-i2-8c43a.firebaseio.com/';
    constructor( private _http : Http){}

    getTournaments() {
        return new Promise( resolve => {
            this._http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe( res => resolve(res.json()));
        })
    }
}