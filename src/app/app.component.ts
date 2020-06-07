import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ScrollObserverComponent } from './scroll-observer/scroll-observer.component';
import { Subscription, pipe, OperatorFunction, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ScrollObserverService } from './scroll-observer/scroll-observer.service';
import { ScrollIntersectionVM } from './scroll-observer/model/scroll-intersection-VM';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'LabIntersectionObserver';

  observedItemVisibility: string;
  percentageFromIntersectionObserver = 0;

  scrollSubscription: Subscription;
  scrollSubscriptionVerbose: Subscription;

  @ViewChild('scrollObserver') scrollObserver: ScrollObserverComponent;

  constructor(private scrollObserverService: ScrollObserverService) { }

  ngOnInit() {
    this.connectIntersectionObserver();
  }

  ngAfterViewInit() {
    // this.connectScrollObserver();
  }

  ngOnDestroy() {
    // this.scrollSubscription?.unsubscribe();
    // this.scrollSubscriptionVerbose?.unsubscribe();
  }

  onScroll(itemVisible: boolean) {
    this.observedItemVisibility = itemVisible ? 'visible' : 'hidden';
  }

  onScrollVerbose(event: ScrollIntersectionVM) {
    console.log(event);
  }

  private connectIntersectionObserver() {
    const callback = entries => this.percentageFromIntersectionObserver = Math.floor(100 * entries[0].intersectionRatio);
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 1.0]
    };
    const intersectionObserver = new IntersectionObserver(callback, options);
    intersectionObserver.observe(document.getElementById('observed'));
  }

  private connectScrollObserver() {
    // this.scrollSubscription = this.scrollObserverService.visible$(document.getElementById('observed')).subscribe(
    //   visible => {
    //     this.observedItemVisibility = visible ? 'visible' : 'hidden';
    //   });

    // this.scrollSubscriptionVerbose = this.scrollObserverService.scrollIntersection$(document.getElementById('lorem1')).subscribe(
    //   data => {
    //     console.log(data);
    //   });
  }
}
