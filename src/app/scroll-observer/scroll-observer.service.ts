import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollObserverService {

  constructor() { }

  scroll$() {
    return fromEvent(document, 'scroll').pipe(
      map(() => document.documentElement.scrollTop)
    );
  }


}
