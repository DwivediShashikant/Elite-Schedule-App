import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import {EliteApiService} from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams : any ;
  tourneyId : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public eliteApi : EliteApiService,
    private _loadingController : LoadingController) {
  }
  ionViewDidLoad() {
    this.tourneyId = this.navParams.data.id;
  
    let loader = this._loadingController.create({
      content : 'Loading Teams...'
    });

    loader.present().then( ()=> {
      this.eliteApi.getTournamentTeamsById(this.tourneyId)
      .subscribe( data=> {
        this.teams = data.teams;
      });
      loader.dismiss();
    })
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
