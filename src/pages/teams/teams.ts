import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import {EliteApiService} from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi : EliteApiService) {
  }
  ionViewDidLoad() {
    this.eliteApi.getTournaments()
    .subscribe( data=> {
      this.teams = data;
    });
    console.log(this.teams);
  }
  // ionViewWillEnter(){
  //   console.log(`##LifeCycle Events## ionViewWillEnter`);
  // }
  // ionViewDidEnter(){
  //   console.log(`##LifeCycle Events## ionViewDidEnter`);
  // }
  // ionViewWillLeave(){
  //   console.log(`##LifeCycle Events## ionViewWillLeave`);
  // }
  // ionViewDidLeave(){
  //   console.log(`##LifeCycle Events## ionViewDidLeave`);
  // }
  // ionViewWillUnload(){
  //   console.log(`##LifeCycle Events## ionViewWillUnload`);
  // }
  // ionViewDidUnload(){
  //   console.log(`##LifeCycle Events## ionViewDidUnload`);
  // }

  itemTapped(team){
    this.navCtrl.push(TeamHomePage,team);
  }
}
