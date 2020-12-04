import { TestBed } from '@angular/core/testing';

import { ManageRoomService } from './manage-room.service';

describe('ManageRoomService', () => {
  let service: ManageRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
