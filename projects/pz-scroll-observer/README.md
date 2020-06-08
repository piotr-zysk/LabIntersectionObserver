# PzScrollObserver

Easy way to observe vertical scroll position and visibility of particular DOM element.

## Installation

```
npm install pz-scroll-observer
```

then add import in your module

```
import { PzScrollObserverModule } from 'pz-scroll-observer';

...

imports [
  PzScrollObserver,
...
]
```

## Component to show current scroll position

```
<pz-scroll-observer></pz-scroll-observer>
```

## Directives to observe visibility od particular DOM element, based on scroll position

```
<div pzScrollIntersection (pzScroll)='onScroll($event)'>
```
```
  onScroll(itemVisible: boolean) {
    this.observedItemVisibility = itemVisible ? 'visible' : 'hidden';
  }
```

### or

```
<div pzScrollIntersectionVerbose (pzScroll)='onScrollVerbose($event)'>
```

```
  onScrollVerbose(event: ScrollIntersectionVM) {
    console.log(event);
  }
```

```
class ScrollIntersectionVM {
    scrollTop: number;  // scroll position
    topCutPercent: number;  // how many percent of top part of element is hidden
    bottomCutPercent: number;  // how many percent of bottom part of element is hidden
    visibilityPercent: number;   // how many percent of element is visible in total
    visible: boolean;  // is the element at least partly visible
    fullyVisible: boolean;  // is the element visible completely
    elementHeightPx: number;  // height of the element
    elementOffsetPx: number;  // offsetTop
    elementViewportOffsetPx: number;  // offset relative to viewport top
}
```

## Observables provided by PzScrollObserverService

ScrollTop

```
scroll$(): Observable<number>
```

Element visibility - emits true when element get visible (art least partly) and emits fals when element hides

```
visible$(el: HTMLElement): Observable<boolean>
```

Element visibility verbose

```
scrollIntersection$(el: HTMLElement): Observable<ScrollIntersectionVM>
```
