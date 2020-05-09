import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Team } from './../team.model';
import { Player } from './../player.model';
import { CricketService } from '../cricket.service';

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
  public imageUrl = 'https://image.shutterstock.com/image-vector/camera-icon-trendy-flat-style-260nw-1017944869.jpg';

  constructor(private httpService:HttpService,
    private formBuilder: FormBuilder,
    private cricketService: CricketService) {
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
        this.cricketService.openSnackBar(response.result, "Success");
      },
      error => {
        this.cricketService.openSnackBar(error.error.result, "Error");
      }
    )
  }

  addPlayer(){
    this.playerForm.value['image_uri'] = this.image_uri;
    this.httpService.postPlayers(new Player(this.playerForm)).subscribe(
      response => {
        this.cricketService.openSnackBar(response.result, "Success");
      },
      error => {
        this.cricketService.openSnackBar(error.error.result, "Error");
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

  async uploadImage(event, type: string){
    
    console.log(event);
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    await this.delay(1000);
    this.imageUrl = reader.result.toString();
    if(this.imageUrl) {
      if(type == "team"){
        this.logo_uri = this.imageUrl;
      } else {
        this.image_uri = this.imageUrl;
      }
    } else {
      this.cricketService.openSnackBar("Please Upload image", "Error");
    }
    
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
