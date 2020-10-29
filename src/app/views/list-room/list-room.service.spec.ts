import { TestBed } from '@angular/core/testing';

import { ListRoomService } from './list-room.service';

describe('ListRoomService', () => {
  let service: ListRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
