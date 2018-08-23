import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarHoverComponent } from './avatar-hover.component';

describe('AvatarHoverComponent', () => {
  let component: AvatarHoverComponent;
  let fixture: ComponentFixture<AvatarHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarHoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
