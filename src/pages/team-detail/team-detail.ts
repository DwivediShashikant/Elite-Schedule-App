import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MyTeamsPage, GamePage } from '../pages';
import * as _ from 'lodash'
import * as moment from 'moment'
import { EliteApiService } from '../../shared/shared';
import { duration } from 'moment';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team : any;
  tourneyData : any;
  games : any;
  teamStanding : any;
  dateFilter : string;
  allGames : any[];
  useDateFilter : boolean = false;
  isFavourite : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _eliteApi : EliteApiService, 
    private _alertController : AlertController, 
    private _toast : ToastController ) {

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
      
      this.allGames = this.games;
      // this.teamStanding = _.find(this.tourneyData.standings, {'teamId' : this.team.id });
      console.log('**team standings',this.teamStanding);
    
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

  itemTapped(game : any){
    let sourceGame = this.tourneyData.games.find( g => g.id === game.gameId)
    this.navCtrl.push(GamePage, sourceGame);
  }

  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter( this.allGames, g => moment(g.time).isSame(this.dateFilter,'day'));
    }
    else{
      this.games = this.allGames;
    }
  }
  getScoreWorL(game: any){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  gameResultColor(game: any){
    return game.scoreDisplay[0]=== 'W' ? 'primary' : 'danger';
  }

  toggleFavourite(){
    this.isFavourite = this.isFavourite === true ? false : true;

    if(this.isFavourite === false){
      let alert = this._alertController.create({
        title : 'Unfollow ?',
        message : 'Are you Sure, you want to unfollow this team ?',
        buttons :[{
          text : 'yes',
          handler : () => {
            // TODO on yes
            let toast = this._toast.create({
              message : 'Successfully Unfollwed',
              duration : 2000,
              position : 'bottom'
            });
            toast.present();
          }
        },{
          text : 'no',
          handler : () => {
            this.isFavourite = true;
            //TODO on no
          }
        }
        ]
      });
      alert.present();
    }
  }
}
