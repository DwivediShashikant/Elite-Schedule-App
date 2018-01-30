import { Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage, TournamentsPage } from '../pages/pages'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav )nav: Nav; 
  rootPage:any = MyTeamsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goHome(){
    this.nav.goToRoot;
  }

  findTournamant(){
    this.nav.push(TournamentsPage);
  }
}

