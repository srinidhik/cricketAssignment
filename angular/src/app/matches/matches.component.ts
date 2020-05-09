import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Winner } from './../winner.model';
import { CricketService } from '../cricket.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  public matches:any;
  winnerForm: FormGroup;
  displayedColumns: string[] = ['team_one_name', 'team_two_name', 'winner'];

  constructor(private httpService:HttpService,
    private formBuilder: FormBuilder,
    private cricketService: CricketService) {
      this.winnerForm = this.createWinnerForm();
     }

  ngOnInit() {

    this.httpService.getMatches().subscribe(response => {
      this.matches = response;
    })

  }

  submitWinner(id:number, index: number){
    this.winnerForm.value["match_id"] = id;
    this.httpService.postWinner(new Winner(this.winnerForm)).subscribe(
      response => {
        this.cricketService.openSnackBar(response.result, "Success");
        this.matches[index]['winner'] = response.winner;
      },
      error => {
        this.cricketService.openSnackBar(error.error.result, "Error");
      }
    )
  }


  createWinnerForm(){
    return this.formBuilder.group({
      winner: ['', Validators.required],
      match_id: ['']
    });
  }

}

