import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyComponent } from './recently.component';

describe('RecentlyComponent', () => {
  let component: RecentlyComponent;
  let fixture: ComponentFixture<RecentlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
