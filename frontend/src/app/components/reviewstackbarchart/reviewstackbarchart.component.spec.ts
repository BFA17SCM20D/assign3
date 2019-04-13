import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewstackbarchartComponent } from './reviewstackbarchart.component';

describe('ReviewstackbarchartComponent', () => {
  let component: ReviewstackbarchartComponent;
  let fixture: ComponentFixture<ReviewstackbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewstackbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewstackbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
