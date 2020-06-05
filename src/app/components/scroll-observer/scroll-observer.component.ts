import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-scroll-observer',
  templateUrl: './scroll-observer.component.html',
  styleUrls: ['./scroll-observer.component.css']
})
export class ScrollObserverComponent implements OnInit, OnDestroy {

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
    });
  }
}
