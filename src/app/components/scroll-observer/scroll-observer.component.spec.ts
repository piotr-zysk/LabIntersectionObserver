import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollObserverComponent } from './scroll-observer.component';

describe('ScrollObserverComponent', () => {
  let component: ScrollObserverComponent;
  let fixture: ComponentFixture<ScrollObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
