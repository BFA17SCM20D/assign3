import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewbarchartComponent } from './reviewbarchart.component';

describe('ReviewbarchartComponent', () => {
  let component: ReviewbarchartComponent;
  let fixture: ComponentFixture<ReviewbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
