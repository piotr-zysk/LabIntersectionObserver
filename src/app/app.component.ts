import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ScrollObserverComponent } from './components/scroll-observer/scroll-observer.component';
import { Subscription, pipe, OperatorFunction, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'LabIntersectionObserver';

  observedItemOffsetHeight = 0;
  observedItemOffsetTop = 0;

  viewportHeightWithScrollBar = 0;
  viewportHeightWithoutScrollBar = 0;

  itemVisibilityPercentage = 0;
  percentageFromIntersectionObserver = 0;

  scrollSubscription: Subscription;

  @ViewChild('scrollObserver') scrollObserver: ScrollObserverComponent;

  ngOnInit() {
    this.getObservedItemPosition();
    this.getViewPortHeight();
    this.calculateItemVisibilityPercentage(0);
    this.connectIntersectionObserver();
  }

  ngAfterViewInit() {
    this.connectScrollObserver();
  }

  ngOnDestroy() {
    this.scrollSubscription?.unsubscribe();
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
    this.scrollSubscription = this.scrollObserver.newScrollTop.pipe(
      this.notifyWhenShowOrHide()
    ).subscribe(
      scrollTop => {
        this.calculateItemVisibilityPercentage(document.documentElement.scrollTop);
      });
  }

  private notifyWhenShowOrHide = () => pipe(
      map((x: number) => this.isItemVisible(x)),
      distinctUntilChanged()
    )

  private getObservedItemPosition() {
    const item = document.getElementById('observed');
    this.observedItemOffsetHeight = item.offsetHeight;
    this.observedItemOffsetTop = item.offsetTop;
  }

  private getViewPortHeight() {
    this.viewportHeightWithScrollBar = window.innerHeight;
    this.viewportHeightWithoutScrollBar = document.documentElement.clientHeight;
  }

  private isItemVisible(scrollTop: number): boolean {
    return Math.floor(this.observedItemOffsetHeight - this.getTopCut(scrollTop) - this.getBottomCut(scrollTop)) > 0;
  }

  private calculateItemVisibilityPercentage(scrollTop: number) {
    this.itemVisibilityPercentage = Math.floor(100 *
      (this.observedItemOffsetHeight - this.getTopCut(scrollTop) - this.getBottomCut(scrollTop)) / this.observedItemOffsetHeight);
  }

  private getTopCut(scrollTop: number) {
    let topCut = scrollTop - this.observedItemOffsetTop;
    if (topCut < 0)
      topCut = 0;
    if (topCut > this.observedItemOffsetHeight)
      topCut = this.observedItemOffsetHeight;
    return topCut;
  }

  private getBottomCut(scrollTop: number) {
    let bottomCut = (this.observedItemOffsetTop + this.observedItemOffsetHeight) - (scrollTop + this.viewportHeightWithoutScrollBar);
    if (bottomCut < 0)
      bottomCut = 0;
    if (bottomCut > this.observedItemOffsetHeight)
      bottomCut = this.observedItemOffsetHeight;
    return bottomCut;
  }
}
