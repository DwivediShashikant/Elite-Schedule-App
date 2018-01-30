import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyTeamsPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
    console.log(`**Nav-Params`);
    console.log(this.team);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
  }
  goHome(){
    // this.navCtrl.push(MyTeamsPage);
    // this.navCtrl.popToRoot();
    console.log('**navCtrl-Parent',this.navCtrl.parent);
    this.navCtrl.parent.parent.popToRoot();
  }

}
