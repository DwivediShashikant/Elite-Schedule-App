import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyTeamsPage } from '../pages';
import * as _ from 'lodash'
import { EliteApiService } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team : any;
  tourneyData : any;
  games : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, private _eliteApi : EliteApiService ) {

    this.team = this.navParams.data;
    console.log(`**Nav-Params`);
    console.log(this.team);

  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this._eliteApi.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
                 .filter( g => g.team1Id === this.team.id || g.team2Id === this.team.id )
                 .map( g => {
                   let isTeam1 = ( g.team1Id === this.team.id );
                   let opponentName = isTeam1 ? g.team2 : g.team1;
                   let scoreDisplay =this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                   return {
                     gameId :g.id,
                     opponent : opponentName,
                     time : Date.parse(g.time),
                     location : g.location,
                     locationUrl : g.locationUrl,
                     scoreDisplay : scoreDisplay,
                     homeAway : ( isTeam1 ? 'vs' : 'at')
                   }
                 })
                 .value();
    
    console.log('**Games',this.games);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score) {
      let teamScore = isTeam1 ? team1Score : team2Score;
      let opponentScore  = isTeam1 ? team2Score : team1Score;
      let winIndicator = team1Score > team2Score ? 'W' : 'L';

      return winIndicator + ':' + teamScore + '-' + opponentScore;
    }
    else {
      return '';
    }
  }

  goHome(){
    console.log('**navCtrl-Parent',this.navCtrl.parent);
    this.navCtrl.parent.parent.popToRoot();
  }

}
