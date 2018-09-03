import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaviconComponent } from './favicon.component';

describe('FaviconComponent', () => {
  let component: FaviconComponent;
  let fixture: ComponentFixture<FaviconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaviconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaviconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
