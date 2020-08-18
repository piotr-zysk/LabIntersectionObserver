# PzResizeObserver

ResizeObsserver directive with Pollyfill for better browser compatibility.

## Installation

```
npm install pz-resize-observer
npm install intersection-observernpm install resize-observer-polyfill --save-dev
```

then add import in your module

```
import { PzResizeObserverModule } from 'pz-resize-observer';

...

imports [
  PzIntersectionObserver,
...
]
```

## Directive usage

html:

```
<div pzResizeObserver (resize)='onResize($event)'>
```

ts:

```
onResize(event: ResizeObserverEntry) {
        this.height = event.contentRect.height;
        console.log(event);
    }
```
