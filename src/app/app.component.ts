import { Component, ViewChild} from '@angular/core';
import { Platform, Nav, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage, TournamentsPage, TeamsPage, TeamHomePage } from '../pages/pages'
import { UserSettignsService, EliteApiService } from '../shared/shared';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav )nav: Nav; 
  rootPage:any = MyTeamsPage;
  favouriteTeams : any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private _useSettings : UserSettignsService,
    private _eliteApi : EliteApiService, 
    private _loader : LoadingController, private _events : Events) {

    platform.ready().then(() => {
      this.refreshFavourite();
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this._events.subscribe('favourites :changed', () => {
      this.refreshFavourite();
    })
  }
  goHome(){
    this.nav.goToRoot;
  }

  findTournamant(){
    this.nav.push(TournamentsPage);
  }

  refreshFavourite(){
   this.favouriteTeams = this._useSettings.getAllFavourites();
  }
  
  goToTeam(favTeam : any){
    let loader = this._loader.create({
      content : 'Getting data...',
      dismissOnPageChange : true
    });
    loader.present();
    this._eliteApi.getTournamentTeamsById(favTeam.tournamentId).subscribe( l => this.nav.push(TeamHomePage,favTeam.team));
  }
}

