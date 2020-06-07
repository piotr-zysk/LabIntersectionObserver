import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScrollObserverComponent } from './scroll-observer/scroll-observer.component';
import { ScrollIntersectionDirective } from './scroll-observer/scroll-intersection.directive';
import { ScrollIntersectionVerboseDirective } from './scroll-observer/scroll-intersection-verbose.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScrollObserverComponent,
    ScrollIntersectionDirective,
    ScrollIntersectionVerboseDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
