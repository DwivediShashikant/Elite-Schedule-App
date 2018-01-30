import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {
   GamePage,
   MyTeamsPage,
   TeamDetailPage,
   TeamsPage,
   TournamentsPage
 } from '../pages/pages'
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
