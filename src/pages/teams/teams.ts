import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApiService } from '../../shared/shared';
import * as _ from 'lodash' 

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams : any ;
  tourneyId : any;
  allTeam : any;
  allTeamDivisions : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public eliteApi : EliteApiService,
    private _loadingController : LoadingController) {
  }

  ionViewDidLoad() {
    this.tourneyId = this.navParams.data.id;
  
    let loader = this._loadingController.create({
      content : 'Loading Teams...'
    });

    loader.present().then( ()=> {

      this.eliteApi.getTournamentTeamsById(this.tourneyId)
      .subscribe( data=> {

        this.teams = data.teams;
        this.allTeam = data.teams;
        this.allTeamDivisions = _.chain(data.teams)
                                 .groupBy('division')
                                 .toPairs()
                                 .map(item => _.zipObject(['divisionName','divisionTeam'], item))
                                 .value();
        
        this.teams = this.allTeamDivisions;
        console.log(this.teams);
      });
      loader.dismiss();

    });

  }
 
  itemTapped(team){
    this.navCtrl.push(TeamHomePage,team);
  }
}
