import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartsmathirtyComponent } from './linechartsmathirty.component';

describe('LinechartsmathirtyComponent', () => {
  let component: LinechartsmathirtyComponent;
  let fixture: ComponentFixture<LinechartsmathirtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartsmathirtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartsmathirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
