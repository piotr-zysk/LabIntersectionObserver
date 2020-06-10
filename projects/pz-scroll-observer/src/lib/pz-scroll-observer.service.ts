import { Injectable } from '@angular/core';
import { fromEvent, pipe, concat, of } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ScrollIntersectionVM } from './model/scroll-intersection-VM';

@Injectable({
  providedIn: 'root'
})
export class PzScrollObserverService {

  constructor() { }

  scroll$() {
    return concat(
      of(this.getScrollY()),
      fromEvent(document, 'scroll').pipe(
        map(() => this.getScrollY())
    ));
  }

  visible$(el: HTMLElement) {
    return this.scroll$().pipe(
      this.notifyWhenShowOrHide(el)
    );
  }

  scrollIntersection$(el: HTMLElement) {
    return this.scroll$().pipe(
      map(scrollY => this.calculateScrollIntesectionVM(scrollY, el))
    );
  }

  private getScrollY() {
    return window.scrollY || document.documentElement?.scrollTop || document.body.scrollTop;
  }

  private calculateScrollIntesectionVM(scrollY: number, el: HTMLElement): ScrollIntersectionVM {
    const itemHeight = this.getItemHeight(el);
    const itemVisibilityPercent = this.getItemVisibilityPercent(scrollY, el);
    return {
      scrollY,
      topCutPercent: Math.floor(100 * this.getTopCut(scrollY, el) / itemHeight),
      bottomCutPercent: Math.floor(100 * this.getBottomCut(scrollY, el) / itemHeight),
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

  private isItemVisible(scrollY: number, el: HTMLElement): boolean {
    return Math.floor(this.getItemHeight(el) - this.getTopCut(scrollY, el) - this.getBottomCut(scrollY, el)) > 0;
  }

  private getItemVisibilityPercent(scrollY: number, el: HTMLElement): number {
    return Math.floor(100 *
      (this.getItemHeight(el) - this.getTopCut(scrollY, el)
       - this.getBottomCut(scrollY, el)) / this.getItemHeight(el));
  }

  private getTopCut(scrollY: number, el: HTMLElement) {
    const itemHeight = this.getItemHeight(el);
    let topCut = scrollY - this.getItemOffsetTop(el);
    if (topCut < 0)
      topCut = 0;
    if (topCut > itemHeight)
      topCut = itemHeight;
    return topCut;
  }

  private getBottomCut(scrollY: number, el: HTMLElement) {
    const itemHeight = this.getItemHeight(el);
    let bottomCut = (this.getItemOffsetTop(el) + itemHeight) - (scrollY + this.getViewportHeight());
    if (bottomCut < 0)
      bottomCut = 0;
    if (bottomCut > itemHeight)
      bottomCut = itemHeight;
    return bottomCut;
  }
}
