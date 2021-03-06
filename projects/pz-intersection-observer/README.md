# PzIntersectionObserver

Easy way to observe HTML element visibility, based on scrolling, resizing, changes in DOM.
Emits true when observed element starts to be visible and emits false when the element hides.

Polyfill included for compatibility with all browsers.

## Installation

```
npm install pz-intersection-observer
npm install intersection-observer
```

then add import in your module

```
import { PzIntersectionObserverModule } from 'pz-intersection-observer';

...

imports [
  PzIntersectionObserver,
...
]
```

## Directive

basic usage

```
<div pzIntersection (visibilityChange)='onIntersectionChange($event)'>
```

with some additional parameters

```
<div pzIntersection (visibilityChange)='onIntersectionChange($event) stopWhenVisible='true' intersectionRootMargin='20px'>
```

optional parameters
```
  @Input() intersectionRootMargin = '0px';  // margin around observed element to be included in intersection calculation

  @Input() intersectionRoot: HTMLElement;

  @Input() intersectionThreshold: number | number[] = 0;  // treshold: If 0, any partial visibility will return true. If 1, only 100% of visibility will return true.

  @Input() stopWhenVisible = false;  // emit 'true' event only once (stop observing once the element gets visible)

  @Input() throttleTime = 0;  // keep the interval between events to be at least X miliseconds
```

When multiple elements are observer with the same set of all optional parameters except 'throttleTime', all of them use the same observer for resource otimization reason.


## Service

PzIntersectionObserverService provides 2 observables:

  fromIntersectionObserver$(
      element: HTMLElement,
      config: IntersectionObserverInit,
      stopWhenVisible = false
    )

  fromIntersectionObserverShare$(
    element: HTMLElement,
    config: IntersectionObserverInit,
    stopWhenVisible = false
  ) = fromIntersectionObserver(element, config, stopWhenVisible).pipe(share())

  example of config object:

    {
        root: document.querySelector('#scrollArea'),
        rootMargin: '0px',
        threshold: 1.0
    }

  Observables emit [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) events





