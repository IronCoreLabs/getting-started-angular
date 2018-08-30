import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwayTeamManagementComponent } from './away-team-management.component';

describe('AwayTeamManagementComponent', () => {
  let component: AwayTeamManagementComponent;
  let fixture: ComponentFixture<AwayTeamManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwayTeamManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwayTeamManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
