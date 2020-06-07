import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollIntersectionVM } from 'pz-scroll-observer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LabIntersectionObserver';

  observedItemVisibility: string;
  percentageFromIntersectionObserver = 0;

  scrollSubscription: Subscription;
  scrollSubscriptionVerbose: Subscription;

  constructor() { }

  ngOnInit() {
    this.connectIntersectionObserver();
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

}
