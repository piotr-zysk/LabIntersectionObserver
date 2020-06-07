import { NgModule } from '@angular/core';
import { PzScrollObserverComponent } from './pz-scroll-observer.component';
import { PzScrollIntersectionVerboseDirective } from './pz-scroll-intersection-verbose.directive';
import { PzScrollIntersectionDirective } from './pz-scroll-intersection.directive';

@NgModule({
  declarations: [PzScrollObserverComponent, PzScrollIntersectionVerboseDirective, PzScrollIntersectionDirective],
  imports: [
  ],
  exports: [PzScrollObserverComponent, PzScrollIntersectionVerboseDirective, PzScrollIntersectionDirective]
})
export class PzScrollObserverModule { }
