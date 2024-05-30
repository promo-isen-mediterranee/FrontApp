import { TestBed } from '@angular/core/testing';

import { UserService } from './User.service';
import { provideHttpClient } from "@angular/common/http";

describe('UserServiceService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
