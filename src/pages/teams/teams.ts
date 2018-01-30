import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams : any[] = [
    { id: 1, name: 'HC Elite'},
    { id: 2, name: 'Team Takeover'},
    { id: 3, name: 'DC Thunder'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('Ionic View Did Load Teams page');
  }
  ionViewWillEnter(){
    console.log(`##LifeCycle Events## ionViewWillEnter`);
  }
  ionViewDidEnter(){
    console.log(`##LifeCycle Events## ionViewDidEnter`);
  }
  ionViewWillLeave(){
    console.log(`##LifeCycle Events## ionViewWillLeave`);
  }
  ionViewDidLeave(){
    console.log(`##LifeCycle Events## ionViewDidLeave`);
  }
  ionViewWillUnload(){
    console.log(`##LifeCycle Events## ionViewWillUnload`);
  }
  ionViewDidUnload(){
    console.log(`##LifeCycle Events## ionViewDidUnload`);
  }

  itemTapped(team){
    this.navCtrl.push(TeamHomePage,team);
  }
}
