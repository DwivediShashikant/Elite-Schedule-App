import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiService } from '../../shared/shared';
import * as _ from 'lodash';
import { map } from 'rxjs/operator/map';
@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  public standings : any[];
  public team : any;
  public allStandings : any;
  public divisionStandings : any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _eliteApi : EliteApiService) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this._eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = _.chain(this.standings)
                       .groupBy('division')
                       .toPairs()
                       .map( item => _.zipObject(['divisionName','divisionStandings'], item ))
                       .value(); 

    console.log('Standings :', this.standings);
    this.divisionStandings = [{}];
    for(let division of this.allStandings){
      console.log(division);
      this.divisionStandings.push(division.divisionStandings);
    }
    console.log('division Standing :', this.divisionStandings);
  }

}
