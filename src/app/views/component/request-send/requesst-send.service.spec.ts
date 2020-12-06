import { TestBed } from '@angular/core/testing';

import { RequesstSendService } from './requesst-send.service';

describe('RequesstSendService', () => {
  let service: RequesstSendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequesstSendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
