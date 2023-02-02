import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppheaderComponent from "./components/appheader/appheader.component"
import { LinkComponent } from './components/link/link.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionpanelComponent } from './components/expansionpanel/expansionpanel.component';

import {MaterialExampleModule} from '../material.module';
import { CardsComponent } from './components/cards/cards.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    LinkComponent,
    ExpansionpanelComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MaterialExampleModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
