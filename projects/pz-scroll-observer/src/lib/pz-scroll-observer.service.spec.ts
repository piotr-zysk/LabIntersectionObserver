import { TestBed } from '@angular/core/testing';

import { PzScrollObserverService } from './pz-scroll-observer.service';

describe('PzScrollObserverService', () => {
  let service: PzScrollObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PzScrollObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
