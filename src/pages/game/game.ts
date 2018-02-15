import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiService } from '../../shared/shared';
import { TeamHomePage } from '../pages'

@IonicPage() 
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _eliteApi : EliteApiService) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
  }

  teamTapped(teamId : number){
    let tourneyData = this._eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find( t=> t.id === teamId);
    this.navCtrl.push(TeamHomePage,team);
  }
}
