import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTellComponent } from './customer-tell.component';

describe('CustomerTellComponent', () => {
  let component: CustomerTellComponent;
  let fixture: ComponentFixture<CustomerTellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
