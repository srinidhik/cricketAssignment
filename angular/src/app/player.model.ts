import { FormGroup } from '@angular/forms';
import { Url } from 'url';

export class Player {

    first_name:string;
    last_name:string;
    image_uri:string;
    jersey_number:number;
    country:string;
    matches:number;
    runs:number;
    highest_runs:number;
    fifties:number;
    hundreds:number;
    team:number;
    player_id:number;

    constructor(data?: FormGroup) {
        if (data !== undefined && data.value !== undefined) {
            this.first_name = data.value.first_name;
            this.last_name = data.value.last_name;
            this.image_uri = data.value.image_uri;
            this.jersey_number = data.value.jersey_number;
            this.country = data.value.country;
            this.matches = data.value.matches;
            this.runs = data.value.runs;
            this.highest_runs = data.value.highest_runs;
            this.fifties = data.value.fifties;
            this.hundreds = data.value.hundreds;
            this.team = data.value.team;
            this.player_id = data.value.player_id;
        }
    }

}
