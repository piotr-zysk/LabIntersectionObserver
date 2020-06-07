import { Directive, OnInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PzScrollObserverService } from './pz-scroll-observer.service';
import { ScrollIntersectionVM } from './model/scroll-intersection-VM';

@Directive({
  selector: '[pzScrollIntersectionVerbose]'
})
export class PzScrollIntersectionVerboseDirective implements OnInit, OnDestroy {
  @Output() pzScroll = new EventEmitter<ScrollIntersectionVM>();

  private subscription: Subscription;

  constructor(private scrollObserverService: PzScrollObserverService, private el: ElementRef) { }

  ngOnInit() {
    this.subscription = this.scrollObserverService.scrollIntersection$(this.el.nativeElement).subscribe(data => this.pzScroll.emit(data));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
