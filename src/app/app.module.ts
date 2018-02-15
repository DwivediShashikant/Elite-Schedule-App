import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EliteApiService, UserSettignsService } from '../shared/shared'
import {
   GamePage,
   MyTeamsPage,
   TeamDetailPage,
   TeamsPage,
   TournamentsPage,
   TeamHomePage,
   StandingsPage
 } from '../pages/pages'
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage'

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name : '__mydb',
      driverOrder :['localstorage']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApiService,
    UserSettignsService,
    Storage
  ]
})
export class AppModule {}
