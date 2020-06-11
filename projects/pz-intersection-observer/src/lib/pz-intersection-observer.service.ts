import 'intersection-observer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PzIntersectionObserverSubscriptionVM } from './model/pz-intersection-observer-subscription-VM';
import { PzIntersectionObserverElementVM } from './model/pz-intersection-observer-element-VM';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PzIntersectionObserverService {

  constructor() { }

  elementObservers: PzIntersectionObserverElementVM[] = [];
  intersectionSubscriptions: PzIntersectionObserverSubscriptionVM[] = [];

  addSubscription(subscription: PzIntersectionObserverSubscriptionVM): number {
    this.intersectionSubscriptions.push(subscription);
    return this.intersectionSubscriptions.length - 1;
  }

  fromIntersectionObserver$(
      element: HTMLElement,
      config: IntersectionObserverInit,
      stopWhenVisible = false
    ) {
      return new Observable<IntersectionObserverEntry>(subscriber => {

        const intersectionObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              subscriber.next(entry);
              if (stopWhenVisible && entry.isIntersecting)
                observer.unobserve(entry.target);
            });
          },
          config
        );
        this.elementObservers.push({element, observer: intersectionObserver});

        intersectionObserver.observe(element);

        return {
          unsubscribe() {
            intersectionObserver.disconnect();

            this.intersectionSubsriptions = this.intersectionSubscriptions.filter(s => s.observer !== intersectionObserver);
            this.elementObservers = this.elementObservers.filter(s => s.observer !== intersectionObserver);
          }
        };
      });
  }

  fromIntersectionObserverShare$(
    element: HTMLElement,
    config: IntersectionObserverInit,
    stopWhenVisible = false
  ) {
    return this.fromIntersectionObserver$(element, config, stopWhenVisible).pipe(
      share()
    );
  }

}
