import { Subscription, Observable } from 'rxjs';

export class PzIntersectionObserverSubscriptionVM {
    subscription: Subscription;
    elements: HTMLElement[];
    observable$: Observable<IntersectionObserverEntry>;
    intersectionRootMargin: string;
    intersectionRoot: HTMLElement;
    intersectionThreshold: number | number[];
    stopWhenVisible: boolean;
}