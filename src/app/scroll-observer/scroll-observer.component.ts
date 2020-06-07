import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { ScrollObserverService } from './scroll-observer.service';

@Component({
  selector: 'pz-scroll-observer',
  templateUrl: './scroll-observer.component.html'
})
export class ScrollObserverComponent implements OnInit, OnDestroy {

  @Output() newScrollTop = new EventEmitter<number>();

  constructor(private scrollObserverService: ScrollObserverService) { }

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
