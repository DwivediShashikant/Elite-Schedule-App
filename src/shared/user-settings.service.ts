import { Injectable} from '@angular/core'
import { Storage } from '@ionic/storage'
import * as _ from 'lodash'
@Injectable()
export class UserSettignsService {

    constructor(private _storage : Storage){}

    favouriteTeam(team, tournamentId, tournamentName){
        let item = { team : team, tournamentId : tournamentId, tournamentName : tournamentName};
        this._storage.set(team.id,item );
    }

    unFavouriteTeam(team){
        this._storage.remove(team.id);
    }

    isFavouriteTeam(team){
        return this._storage.get(team.id).then( values => values ? true : false);
    }

    getAllFavourites(){
        let items = [];
        _.forIn(window.localStorage, (v,k) => {
            items.push(v);
        })
        return items.length ? items : null;
    }
}