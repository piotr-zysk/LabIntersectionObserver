import { Injectable, ElementRef } from '@angular/core';
import { fromEvent, pipe } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollObserverService {

  constructor() { }

  scroll$() {
    return fromEvent(document, 'scroll').pipe(
      map(() => document.documentElement.scrollTop)
    );
  }

  visible$(elementId: string) {
    return this.scroll$().pipe(
      this.notifyWhenShowOrHide(elementId)
    );
  }

  scrollIntersection$(elementId: string) {
    return this.scroll$();
  }

  private notifyWhenShowOrHide = (elementId: string) => pipe(
    map((x: number) => this.isItemVisible(elementId, x)),
    distinctUntilChanged()
  )

  getItemOffsetTop(elementId: string): number {
    return this.getElementById(elementId).offsetTop;
  }

  getItemHeight(elementId: string): number {
    return this.getElementById(elementId).offsetHeight;
  }

  getViewportHeight(): number {
    return document.documentElement.clientHeight;
  }

  private getElementById(elementId: string): HTMLElement {
    return document.getElementById('observed');
  }

  private isItemVisible(elementId: string, scrollTop: number): boolean {
    return Math.floor(this.getItemHeight(elementId) - this.getTopCut(elementId, scrollTop) - this.getBottomCut(elementId, scrollTop)) > 0;
  }

  private getItemVisibilityPercentage(elementId: string, scrollTop: number): number {
    return Math.floor(100 *
      (this.getItemHeight(elementId) - this.getTopCut(elementId, scrollTop)
       - this.getBottomCut(elementId, scrollTop)) / this.getItemHeight(elementId));
  }

  private getTopCut(elementId: string, scrollTop: number) {
    const itemHeight = this.getItemHeight(elementId);
    let topCut = scrollTop - this.getItemOffsetTop(elementId);
    if (topCut < 0)
      topCut = 0;
    if (topCut > itemHeight)
      topCut = itemHeight;
    return topCut;
  }

  private getBottomCut(elementId: string, scrollTop: number) {
    const itemHeight = this.getItemHeight(elementId);
    let bottomCut = (this.getItemOffsetTop(elementId) + itemHeight) - (scrollTop + this.getViewportHeight());
    if (bottomCut < 0)
      bottomCut = 0;
    if (bottomCut > itemHeight)
      bottomCut = itemHeight;
    return bottomCut;
  }

}
