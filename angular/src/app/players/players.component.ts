import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from './../player.model';
import { environment } from 'src/environments/environment';
import { CricketService } from '../cricket.service';

export interface PlayerDialogData {
  player: any;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  public players: any;
  public apiHostUrl = environment.apiHostUrl;
  displayedColumns: string[] = ['name', 'team', 'jersey_number', 'country', 'matches', 'runs', 'highest_runs', 'fifties', 'hundreds', 'image_uri', 'action'];
  private updateIndex: number;

  constructor(private httpService:HttpService,
    public dialog: MatDialog,) { }

  ngOnInit() {

    this.httpService.getPlayers(null).subscribe(response => {
      this.players = response;
    })

  }

  updatePlayer(player:any, index: number){
    this.updateIndex = index;
    const dialogRef = this.dialog.open(UpdatePlayerComponent, {
      width: "70%",
      data: { 
        player: player,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let updatedData = result.updatedData[0];
      this.players[this.updateIndex]['matches'] = updatedData['matches'];
      this.players[this.updateIndex]['runs'] = updatedData['runs'];
      this.players[this.updateIndex]['highest_runs'] = updatedData['highest_runs'];
      this.players[this.updateIndex]['fifties'] = updatedData['fifties'];
      this.players[this.updateIndex]['hundreds'] = updatedData['hundreds'];
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
  private updatedData: any;

  constructor(private httpService:HttpService,
    private formBuilder: FormBuilder,
    private cricketService: CricketService,
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
        this.cricketService.openSnackBar(response.result, "Success");
        this.updatedData = response.updatedData;
        this.closeModal();
      },
      error => {
        this.cricketService.openSnackBar(error.error.result, "Error");
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close({ event: 'close', updatedData: this.updatedData });
  }

  createPlayerForm(){
    return this.formBuilder.group({
      matches: [''],
      runs: [''],
    });
  }

}

