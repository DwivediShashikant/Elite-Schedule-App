import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events} from 'ionic-angular'
import * as _ from 'lodash'
@Injectable()
export class UserSettignsService {

    constructor(private _storage : Storage, private _event  : Events){}

    favouriteTeam(team, tournamentId, tournamentName){
        let item = { team : team, tournamentId : tournamentId, tournamentName : tournamentName};
        this._storage.set(team.id,item );
        this._event.publish('favourites :changed');
    }

    unFavouriteTeam(team){
        this._storage.remove(team.id);
        this._event.publish('favourites :changed');
    }

    isFavouriteTeam(team){
        return this._storage.get(team.id).then( values => values ? true : false);
    }

    getAllFavourites(){
        let items = [];
        let filteredItems = [];
        _.forIn(window.localStorage, (v,k) => {
            items.push(v);
        })
        for(let i=0;i< items.length - 7;i++){
            if(items[i] !== 'false'){
                filteredItems.push(JSON.parse(items[i]));
            }
        }
       console.log('**getAllFavourites',filteredItems);
        return filteredItems.length ? filteredItems : null;
    }
}