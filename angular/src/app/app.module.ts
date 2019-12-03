import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent, ViewPlayerComponent } from './teams/teams.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayersComponent, UpdatePlayerComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { PointsComponent } from './points/points.component';
import { AddDataComponent } from './add-data/add-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    PlayersComponent,
    MatchesComponent,
    PointsComponent,
    AddDataComponent,
    UpdatePlayerComponent,
    ViewPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    HttpService,

  ],
  entryComponents: [
    UpdatePlayerComponent,
    ViewPlayerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
