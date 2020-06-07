import { Directive, EventEmitter, Output, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { PzScrollObserverService } from './pz-scroll-observer.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[pzScrollIntersection]'
})
export class PzScrollIntersectionDirective implements OnInit, OnDestroy {
  @Output() pzScroll = new EventEmitter<boolean>();

  private subscription: Subscription;

  constructor(private scrollObserverService: PzScrollObserverService, private el: ElementRef) { }

  ngOnInit() {
    this.subscription = this.scrollObserverService.visible$(this.el.nativeElement).subscribe(data => this.pzScroll.emit(data));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
