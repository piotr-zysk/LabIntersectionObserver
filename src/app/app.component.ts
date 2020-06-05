import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LabIntersectionObserver';

  observedItemOffsetHeight = 0;
  observedItemOffsetTop = 0;

  viewportHeightWithScrollBar = 0;
  viewportHeightWithoutScrollBar = 0;

  itemVisibilityPercentage = 0;

  ngOnInit() {
    this.getObservedItemPosition();
    this.getViewPortHeight();
    this.calculateItemVisibilityPercentage(0);
  }

  private getObservedItemPosition() {
    const item = document.getElementById('observed');
    this.observedItemOffsetHeight = item.offsetHeight;
    this.observedItemOffsetTop = item.offsetTop;
  }

  private getViewPortHeight() {
    this.viewportHeightWithScrollBar = window.innerHeight;
    this.viewportHeightWithoutScrollBar = document.documentElement.clientHeight;
  }

  onScroll(scrollTop: number) {
    this.calculateItemVisibilityPercentage(scrollTop);
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
