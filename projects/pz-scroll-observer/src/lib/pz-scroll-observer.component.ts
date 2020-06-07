import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { PzScrollObserverService } from './pz-scroll-observer.service';

@Component({
  selector: 'pz-scroll-observer',
  template: `{{scrollPosition}}`
})

export class PzScrollObserverComponent implements OnInit, OnDestroy {

  @Output() newScrollTop = new EventEmitter<number>();

  constructor(private scrollObserverService: PzScrollObserverService) { }

  scrollPosition = 0;
  private subscription: Subscription;

  ngOnInit() {
    this.initScrollObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initScrollObserver() {
    this.subscription = this.scrollObserverService.scroll$().subscribe(scrollTop => {
        this.scrollPosition = scrollTop;
        this.newScrollTop.emit(this.scrollPosition);
      });
  }
}
