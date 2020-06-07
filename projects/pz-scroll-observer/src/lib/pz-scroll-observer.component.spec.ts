import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PzScrollObserverComponent } from './pz-scroll-observer.component';

describe('PzScrollObserverComponent', () => {
  let component: PzScrollObserverComponent;
  let fixture: ComponentFixture<PzScrollObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PzScrollObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PzScrollObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
