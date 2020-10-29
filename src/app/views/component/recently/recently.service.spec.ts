import { TestBed } from '@angular/core/testing';

import { RecentlyService } from './recently.service';

describe('RecentlyService', () => {
  let service: RecentlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
