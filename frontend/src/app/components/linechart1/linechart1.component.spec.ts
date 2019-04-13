import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Linechart1Component } from './linechart1.component';

describe('Linechart1Component', () => {
  let component: Linechart1Component;
  let fixture: ComponentFixture<Linechart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Linechart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Linechart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
