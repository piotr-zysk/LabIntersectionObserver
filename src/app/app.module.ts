import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PzScrollObserverModule } from 'pz-scroll-observer';
import { PzIntersectionObserverModule } from 'projects/pz-intersection-observer/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PzScrollObserverModule,
    PzIntersectionObserverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
