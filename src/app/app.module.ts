import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScrollObserverComponent } from './components/scroll-observer/scroll-observer.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollObserverComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
