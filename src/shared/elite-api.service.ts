import { Injectable } from "@angular/core";
import { Http} from  "@angular/http"
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class EliteApiService{

    currentTourney : any;
    private baseUrl = 'https://elite-schedule-app-i2-8c43a.firebaseio.com/';

    constructor( private _http : HttpClient){}
        
    getTournaments() : Observable<any>{
        return this._http.get<any>(`${this.baseUrl}/tournaments.json`)
        ._do(data => console.log( 'Response Data',JSON.stringify(data)))
        .catch( this.handleError);
    }

    getTournamentTeamsById(tourneyId : any) : Observable<any>{
        return this._http.get<any>(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
        ._do(data => console.log( 'Response Data',JSON.stringify(data)))
        .map( (resp: Response) =>{
            this.currentTourney = resp;
            return this.currentTourney;
        })
        .catch( this.handleError);

    }

    getCurrentTourney(){
        console.log('**returnng current tournamenent :', this.currentTourney);
        return this.currentTourney;
    }

    handleError(err : HttpErrorResponse){
        console.log( err.message);
        return Observable.throw( err.message);
    }
}