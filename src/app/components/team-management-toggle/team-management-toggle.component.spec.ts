import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagementToggleComponent } from './team-management-toggle.component';

describe('TeamManagementToggleComponent', () => {
  let component: TeamManagementToggleComponent;
  let fixture: ComponentFixture<TeamManagementToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamManagementToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManagementToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
