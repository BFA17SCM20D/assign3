import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Linechart2Component } from './linechart2.component';

describe('Linechart2Component', () => {
  let component: Linechart2Component;
  let fixture: ComponentFixture<Linechart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Linechart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Linechart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
