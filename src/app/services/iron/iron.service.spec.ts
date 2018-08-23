import { TestBed, inject } from '@angular/core/testing';

import { IronService } from './iron.service';

describe('IronService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IronService]
    });
  });

  it('should be created', inject([IronService], (service: IronService) => {
    expect(service).toBeTruthy();
  }));
});
