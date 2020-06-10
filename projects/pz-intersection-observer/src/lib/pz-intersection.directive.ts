import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PzIntersectionObserverService } from './pz-intersection-observer.service';

@Directive({
  selector: '[pzIntersection]'
})
export class PzIntersectionDirective implements OnInit, OnDestroy {
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];
  @Input() stopWhenVisible = false;

  @Output() visibilityChange = new EventEmitter<boolean>();

  private destroy$ = new Subject();

  constructor(private intersectionObserverService: PzIntersectionObserverService, private el: ElementRef) { }

  ngOnInit() {
    const element = this.el.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    this.intersectionObserverService.fromIntersectionObserver$(
      element,
      config,
      this.stopWhenVisible
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe((status) => {
      this.visibilityChange.emit(status);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
