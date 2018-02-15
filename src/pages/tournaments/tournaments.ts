import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyTeamsPage, TeamsPage } from '../pages';
import { EliteApiService } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteApi : EliteApiService,
    private _loadingController : LoadingController) {
  }

  itemTapped(tournaments){
    this.navCtrl.push(TeamsPage,tournaments);
  }

  ionViewDidLoad(){
   
    let loader = this._loadingController.create({
      content : 'Loading Tournaments'
    });

    loader.present().then( ()=>{
      this.eliteApi.getTournaments()
      .subscribe( data => this.tournaments = data);
      loader.dismiss();
    })
  }
}
