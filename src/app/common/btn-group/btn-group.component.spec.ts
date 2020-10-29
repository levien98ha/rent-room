import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGroupComponent } from './btn-group.component';

describe('BtnGroupComponent', () => {
  let component: BtnGroupComponent;
  let fixture: ComponentFixture<BtnGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
