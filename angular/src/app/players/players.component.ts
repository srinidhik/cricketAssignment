import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from './../player.model';
import { environment } from 'src/environments/environment';

export interface PlayerDialogData {
  player: any;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  public players:any;
  public apiHostUrl = environment.apiHostUrl;
  displayedColumns: string[] = ['name', 'team', 'jersey_number', 'country', 'matches', 'runs', 'highest_runs', 'fifties', 'hundreds', 'image_uri', 'action'];

  constructor(private httpService:HttpService,
    public dialog: MatDialog,) { }

  ngOnInit() {

    this.httpService.getPlayers(null).subscribe(response => {
      this.players = response;
    })

  }

  updatePlayer(player:any){
    const dialogRef = this.dialog.open(UpdatePlayerComponent, {
      width: "70%",
      data: { 
        player: player,
      }
    });
  }

}



@Component({
  selector: 'update-player-component',
  templateUrl: 'update-player.component.html',
  styleUrls: ['update-player.component.css']
})

export class UpdatePlayerComponent {
  public player: any;
  playerForm: FormGroup;

  constructor(private httpService:HttpService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatePlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public playerData: PlayerDialogData,
  ) {
    this.playerForm = this.createPlayerForm();
  }

  ngOnInit() {
    this.player = this.playerData;
  }

  updatePlayer(id:number){
    this.playerForm.value["player_id"] = id;
    this.httpService.postPlayers(new Player(this.playerForm)).subscribe(
      response => {
        alert(response);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  createPlayerForm(){
    return this.formBuilder.group({
      matches: [''],
      runs: [''],
    });
  }

}

