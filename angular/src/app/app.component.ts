import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cricket-app';

  public navLinks = [
    {path: "/teams", label: "Teams"},
    {path: "/players", label: "Players"},
    {path: "/matches", label: "Matches"},
    {path: "/points", label: "Points"},
    {path: "/add-data", label: "Add Data"}
  ];

}
