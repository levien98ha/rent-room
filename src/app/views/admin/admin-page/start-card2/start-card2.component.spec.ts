import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCard2Component } from './start-card2.component';

describe('StartCard2Component', () => {
  let component: StartCard2Component;
  let fixture: ComponentFixture<StartCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
