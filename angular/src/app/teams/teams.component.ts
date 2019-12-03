import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment.prod';


export interface PlayerDialogData {
  id: any;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  public teams:any;
  public players:any;
  public apiHostUrl: string;
  displayedColumns: string[] = ['name', 'club_state', 'logo_uri', 'view_players'];
  constructor(private httpService:HttpService,
    public dialog: MatDialog,) { }

  ngOnInit() {

    this.httpService.getTeams().subscribe(response => {
      this.teams = JSON.parse(response);
    })

    this.apiHostUrl = environment.apiHostUrl;
  }

  viewPlayers(id:number){

    const dialogRef = this.dialog.open(ViewPlayerComponent, {
      width: "70%",
      data: { 
        id: id,
      }
    });

  }

 
}



@Component({
  selector: 'view-player-component',
  templateUrl: 'view-player.component.html',
  styleUrls: ['view-player.component.css']
})

export class ViewPlayerComponent {
  public players: any;
  public apiHostUrl = environment.apiHostUrl;
  displayedColumns: string[] = ['name', 'team', 'jersey_number', 'country', 'matches', 'runs', 'highest_runs', 'fifties', 'hundreds', 'image_uri'];

  constructor(private httpService:HttpService,
    public dialogRef: MatDialogRef<ViewPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public playerData: PlayerDialogData,
  ) {  }

  ngOnInit() {
    const id = this.playerData.id;
    this.httpService.getPlayers(id).subscribe(response => {
      this.players = response;
    })
  }

  closeModal(): void {
    this.dialogRef.close();
  }


}