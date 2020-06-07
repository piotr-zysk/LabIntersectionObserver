import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-scroll-observer',
  templateUrl: './scroll-observer.component.html',
  styleUrls: ['./scroll-observer.component.css']
})
export class ScrollObserverComponent implements OnInit, OnDestroy {

  @Output() newScrollTop = new EventEmitter<number>();

  constructor() { }

  scrollPosition = 0;
  private subscription: Subscription;

  ngOnInit() {
    this.initScrollObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initScrollObserver() {
    const scrollObservable = fromEvent(document, 'scroll');
    const subscription = scrollObservable.subscribe(() => {
      this.scrollPosition = document.documentElement.scrollTop;
      this.newScrollTop.emit(this.scrollPosition);
    });
  }
}
