import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  public points:any;
  displayedColumns: string[] = ['team_name', 'points', 'total_matches', 'won_matches', 'lost_matches', 'tie_matches'];

  constructor(private httpService:HttpService) { }

  ngOnInit() {

    this.httpService.getPoints().subscribe(response => {
      this.points = response;
    })

  }

}
