import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PzScrollObserverModule } from 'pz-scroll-observer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PzScrollObserverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
