import { TestBed } from '@angular/core/testing';

import { UserMgmntService } from './user-mgmnt.service';

describe('UserMgmntService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMgmntService = TestBed.get(UserMgmntService);
    expect(service).toBeTruthy();
  });
});
