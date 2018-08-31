import { TestBed, inject } from '@angular/core/testing';

import { AwayTeamService } from './away-team.service';

describe('AwayTeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwayTeamService]
    });
  });

  it('should be created', inject([AwayTeamService], (service: AwayTeamService) => {
    expect(service).toBeTruthy();
  }));
});
