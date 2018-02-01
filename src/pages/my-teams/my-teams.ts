import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage, TournamentsPage, TeamHomePage } from '../pages';
import { EliteApiService } from '../../shared/shared'

@IonicPage()
@Component({
  selector: 'pageMyTeams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favourites = [
    {
      team : { id: 812, name : 'Baltimore Stars', coach :'James'},
      tournamentId : '3dd50aaf-6b03-4497-b074-d81703f07ee8',
      tournamentName : 'Cager Classic'
    },
    {
      team : { id: 844, name : 'Sharks', coach :'Smith'},
      tournamentId : '46ebd526-8839-476a-9ba0-8a9b2c07f3c3',
      tournamentName : 'Cager Classic'
    }
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private _eliteApi : EliteApiService, 
    private _loadingController: LoadingController) {
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
}
