import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PzIntersectionObserverService {

  constructor() { }

  fromIntersectionObserver$(
      element: HTMLElement,
      config: IntersectionObserverInit,
      stopWhenVisible = false
    ) {
      return new Observable<boolean>(subscriber => {
        const subject$ = new Subject<{
          entry: IntersectionObserverEntry;
          observer: IntersectionObserver;
        }>();

        const intersectionObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              subject$.next({ entry, observer });
            });
          },
          config
        );

        subject$.subscribe(
          ({entry, observer}) => {
            subscriber.next(entry.isIntersecting);
            if (stopWhenVisible && entry.isIntersecting)
              observer.unobserve(entry.target);
          });

        intersectionObserver.observe(element);

        return {
          unsubscribe() {
            intersectionObserver.disconnect();
            subject$.unsubscribe();
          }
        };
      });
  }

}
