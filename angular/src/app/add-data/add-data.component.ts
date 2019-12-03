import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Team } from './../team.model';
import { Player } from './../player.model';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  teamForm: FormGroup;
  playerForm: FormGroup;
  public teams:any;
  private logo_uri:string;
  private image_uri:string;

  constructor(private httpService:HttpService,
    private formBuilder: FormBuilder) {
      this.teamForm = this.createTeamForm();
      this.playerForm = this.createPlayerForm();
     }

  ngOnInit() {

    this.httpService.getTeams().subscribe(response => {
      this.teams = JSON.parse(response);
    });

  }

  addTeam(){
    this.teamForm.value['logo_uri'] = this.logo_uri;
    this.httpService.postTeams(new Team(this.teamForm)).subscribe(
      response => {
        alert(response);
      }
    )
  }

  addPlayer(){
    this.playerForm.value['image_uri'] = this.image_uri;
    this.httpService.postPlayers(new Player(this.playerForm)).subscribe(
      response => {
        alert(response);
      }
    );
  }

  createTeamForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      club_state: [''],
      logo_uri: [''],
    });
  }

  createPlayerForm(){
    return this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      jersey_number: ['', Validators.required],
      country: [''],
      matches: [''],
      runs: [''],
      highest_runs: [''],
      fifties: [''],
      hundreds: [''],
      team: [''],
      image_uri: [''],
    });
  }

  uploadImage(event, type){
    console.log(event);
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    if(type=="team"){
      this.logo_uri = reader.result.toString();
    }else {
      this.image_uri = reader.result.toString();
    }
    
  }

}
