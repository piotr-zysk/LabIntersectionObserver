# PzScrollObserver

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.


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


Run `ng generate component component-name --project pz-scroll-observer` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project pz-scroll-observer`.
> Note: Don't forget to add `--project pz-scroll-observer` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build pz-scroll-observer` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build pz-scroll-observer`, go to the dist folder `cd dist/pz-scroll-observer` and run `npm publish`.

## Running unit tests

Run `ng test pz-scroll-observer` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
