import { FormGroup } from '@angular/forms';

export class Team {

   name: string;
   club_state: string;
   logo_uri: string;

   constructor(data?: FormGroup) {
       if (data !== undefined && data.value !== undefined) {
           this.name = data.value.name;
           this.club_state = data.value.club_state;
           this.logo_uri = data.value.logo_uri;
       }
   }


} 

