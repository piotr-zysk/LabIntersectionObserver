import { Directive, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

const entriesMap = new WeakMap();

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entriesMap.has(entry.target)) {
            const comp = entriesMap.get(entry.target);
            comp._resizeCallback(entry);
        }
    }
});
@Directive({
  selector: '[pzResizeObserver]'
})

export class PzResizeObserverDirective implements OnDestroy {
    // tslint:disable-next-line: no-output-native
    @Output() resize = new EventEmitter();

    constructor(private el: ElementRef) {
        const target = this.el.nativeElement;
        entriesMap.set(target, this);
        resizeObserver.observe(target);
    }

    _resizeCallback(entry: any) {
        this.resize.emit(entry);
    }

    ngOnDestroy() {
        const target = this.el.nativeElement;
        resizeObserver.unobserve(target);
        entriesMap.delete(target);
    }
}

