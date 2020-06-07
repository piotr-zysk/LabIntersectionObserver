import { Injectable } from '@angular/core';
import { fromEvent, pipe } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ScrollIntersectionVM } from './model/scroll-intersection-VM';

@Injectable({
  providedIn: 'root'
})
export class PzScrollObserverService {

  constructor() { }

  scroll$() {
    return fromEvent(document, 'scroll').pipe(
      map(() => document.documentElement.scrollTop)
    );
  }

  visible$(el: HTMLElement) {
    return this.scroll$().pipe(
      this.notifyWhenShowOrHide(el)
    );
  }

  scrollIntersection$(el: HTMLElement) {
    return this.scroll$().pipe(
      map(scrollTop => this.calculateScrollIntesectionVM(scrollTop, el))
    );
  }

  private calculateScrollIntesectionVM(scrollTop: number, el: HTMLElement): ScrollIntersectionVM {
    const itemHeight = this.getItemHeight(el);
    const itemVisibilityPercent = this.getItemVisibilityPercent(scrollTop, el);
    return {
      scrollTopPercent: scrollTop,
      topCutPercent: Math.floor(100 * this.getTopCut(scrollTop, el) / itemHeight),
      bottomCutPercent: Math.floor(100 * this.getBottomCut(scrollTop, el) / itemHeight),
      visibilityPercent: itemVisibilityPercent,
      visible: itemVisibilityPercent > 0,
      fullyVisible: itemVisibilityPercent === 100,
      elementHeightPx: itemHeight,
      elementOffsetPx: this.getItemOffsetTop(el),
      elementViewportOffsetPx: this.getViewportHeight()
    } as ScrollIntersectionVM;
  }

  private notifyWhenShowOrHide = (el: HTMLElement) => pipe(
    map((x: number) => this.isItemVisible(x, el)),
    distinctUntilChanged()
  )

  private getItemOffsetTop(el: HTMLElement): number {
    return el.offsetTop;
  }

  private getItemHeight(el: HTMLElement): number {
    return el.offsetHeight;
  }

  private getViewportHeight(): number {
    return document.documentElement.clientHeight;
  }

  private isItemVisible(scrollTop: number, el: HTMLElement): boolean {
    return Math.floor(this.getItemHeight(el) - this.getTopCut(scrollTop, el) - this.getBottomCut(scrollTop, el)) > 0;
  }

  private getItemVisibilityPercent(scrollTop: number, el: HTMLElement): number {
    return Math.floor(100 *
      (this.getItemHeight(el) - this.getTopCut(scrollTop, el)
       - this.getBottomCut(scrollTop, el)) / this.getItemHeight(el));
  }

  private getTopCut(scrollTop: number, el: HTMLElement) {
    const itemHeight = this.getItemHeight(el);
    let topCut = scrollTop - this.getItemOffsetTop(el);
    if (topCut < 0)
      topCut = 0;
    if (topCut > itemHeight)
      topCut = itemHeight;
    return topCut;
  }

  private getBottomCut(scrollTop: number, el: HTMLElement) {
    const itemHeight = this.getItemHeight(el);
    let bottomCut = (this.getItemOffsetTop(el) + itemHeight) - (scrollTop + this.getViewportHeight());
    if (bottomCut < 0)
      bottomCut = 0;
    if (bottomCut > itemHeight)
      bottomCut = itemHeight;
    return bottomCut;
  }
}
