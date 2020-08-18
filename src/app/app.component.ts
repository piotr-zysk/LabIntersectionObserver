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

  x = 'blabla frfi fri frjfrifj rifjef efrkfjeklfj erkfler frlf erfjrkfjerlfk erferk fjerklfjerklf erlf rkfj rfjerlf rfkjrfkjrelfe rfjerflkerjfrkefj erlkfj rekfjerlkfj';

  constructor() { }

  ngOnInit() {
    this.connectIntersectionObserver();
    setTimeout(() => this.x += this.x, 2000);
  }

  onScroll(itemVisible: boolean) {
    this.observedItemVisibility = itemVisible ? 'visible' : 'hidden';
  }

  onIntersection(itemVisible: boolean) {
    console.log(itemVisible);
  }

  onScrollVerbose(event: ScrollIntersectionVM) {
    // console.log(event);
  }

  onIntersectionChange(visible: boolean) {
    console.log(visible);
  }

  onResize(event: ResizeObserverEntry) {
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
