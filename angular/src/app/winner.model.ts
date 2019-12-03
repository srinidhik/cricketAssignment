import { FormGroup } from '@angular/forms';

export class Winner {

    winner: any;
    match_id: number;

    constructor(data?: FormGroup) {
        if (data !== undefined && data.value !== undefined) {
            this.winner = data.value.winner;
            this.match_id = data.value.match_id;
        }
    }

}
