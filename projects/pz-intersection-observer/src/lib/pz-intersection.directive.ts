import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, tap, throttleTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PzIntersectionObserverService } from './pz-intersection-observer.service';
import { PzIntersectionObserverSubscriptionVM } from './model/pz-intersection-observer-subscription-VM';

@Directive({
  selector: '[pzIntersection]'
})
export class PzIntersectionDirective implements OnInit, OnDestroy {
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement = null;
  @Input() intersectionThreshold: number | number[] = 0;
  @Input() stopWhenVisible = false;
  @Input() throttleTime = 0;

  @Output() visibilityChange = new EventEmitter<boolean>();

  private destroy$ = new Subject();

  private subscriptionNumber: number;

  constructor(private intersectionObserverService: PzIntersectionObserverService, private el: ElementRef) { }

  ngOnInit() {
    const element = this.el.nativeElement;

    const parentSubscription = this.findSubscription();

    if (parentSubscription) {
      this.addElementToExistingSubscription(element, parentSubscription);
    }
    else {
      this.addNewSubscription(element);
    }
  }

  ngOnDestroy() {
    const intersectionSubscription = this.findSubscription();
    intersectionSubscription.subscription.unsubscribe();

    if (intersectionSubscription.elements.length > 1) {
      const el = this.el.nativeElement;
      this.intersectionObserverService.elementObservers.find(o => o.element === el).observer.unobserve(el);
      intersectionSubscription.elements = intersectionSubscription.elements.filter(e => e !== el);
    }
    else {
      this.intersectionObserverService.intersectionSubscriptions = this.intersectionObserverService.intersectionSubscriptions
        .filter(s => s !== intersectionSubscription);
    }
  }

  private addElementToExistingSubscription(element: HTMLElement, parentSubscription: PzIntersectionObserverSubscriptionVM): void {
    const elementObserver = this.intersectionObserverService.elementObservers.find(o => o.element = parentSubscription.elements[0]);
    elementObserver.observer.observe(element);
    this.findSubscription().elements.push(element);
    this.intersectionObserverService.elementObservers.push({element, observer: elementObserver.observer});
    this.subscribe(parentSubscription.observable$, element);
  }

  private addNewSubscription(element: HTMLElement): void {
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    const observable$ = this.intersectionObserverService.fromIntersectionObserverShare$(
      element,
      config,
      this.stopWhenVisible
    );

    const subscription = this.subscribe(observable$, element);

    const newSubscription: PzIntersectionObserverSubscriptionVM = {
      subscription,
      observable$,
      elements: [element],
      intersectionRootMargin: this.intersectionRootMargin,
      intersectionRoot: this.intersectionRoot,
      intersectionThreshold: this.intersectionThreshold,
      stopWhenVisible: this.stopWhenVisible
    };

    this.subscriptionNumber = this.intersectionObserverService.addSubscription(newSubscription);
  }

  private subscribe(observable$: Observable<IntersectionObserverEntry>, element: HTMLElement): Subscription {
    return observable$.pipe(
      filter(entry => entry.target === element),
      throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
      map(entry => entry.isIntersecting),
      distinctUntilChanged(),
      tap(isIntersecting => this.visibilityChange.emit(isIntersecting)),
      ).subscribe();
  }

  private findSubscription(): PzIntersectionObserverSubscriptionVM {
    return this.intersectionObserverService.intersectionSubscriptions.find(s =>
      ((!s.intersectionRoot && !this.intersectionRoot) || s.intersectionRoot === this.intersectionRoot) &&
      s.intersectionRootMargin === this.intersectionRootMargin &&
      ((!s.intersectionThreshold && !this.intersectionThreshold) || s.intersectionThreshold === this.intersectionThreshold) &&
      s.stopWhenVisible === this.stopWhenVisible
      );
  }
}
