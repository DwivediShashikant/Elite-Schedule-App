import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApiService, UserSettignsService } from '../../shared/shared'

@IonicPage()
@Component({
  selector: 'pageMyTeams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favourites = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private _eliteApi : EliteApiService, 
    private _loadingController: LoadingController, 
    private _userSetting : UserSettignsService) {
  }

  tapped(){
    this.navCtrl.push(TournamentsPage);
  }

  favTapped(favourite : any){
     
    let loader =this._loadingController.create({
      content : 'loading Matches...',
      dismissOnPageChange :true
    })

    loader.present();
    this._eliteApi.getTournamentTeamsById(favourite.tournamentId)
    .subscribe( t=> this.navCtrl.push(TeamHomePage,favourite.team));
  }

  ionViewDidEnter(){
    let favourite = this._userSetting.getAllFavourites();
    console.log(favourite);
    for(let i=0;i<favourite.length - 6;i++){
      this.favourites.push(JSON.parse(favourite[i]));
    }
  }
}
