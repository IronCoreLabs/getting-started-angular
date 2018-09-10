import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMessageComponent } from './order-message.component';

describe('OrderMessageComponent', () => {
  let component: OrderMessageComponent;
  let fixture: ComponentFixture<OrderMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
