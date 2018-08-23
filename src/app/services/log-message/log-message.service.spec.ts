import { TestBed, inject } from '@angular/core/testing';

import { LogMessageService } from './log-message.service';

describe('LogMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogMessageService]
    });
  });

  it('should be created', inject([LogMessageService], (service: LogMessageService) => {
    expect(service).toBeTruthy();
  }));
});
