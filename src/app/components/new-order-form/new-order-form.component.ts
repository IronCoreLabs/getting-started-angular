import { Component, OnInit, Injectable } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../services/order/order';

@Component({
  selector: 'app-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.css']
})

@Injectable({ providedIn: 'root' })
export class NewOrderFormComponent implements OnInit {
  iconClasses: string[];
  orderBody: string;
  orderTitle: string;

  /** Construct a new NewOrderFormComponent */
  constructor(private orderService: OrderService) {
    // TODO: icon classes
    this.iconClasses = [];
    this.orderBody = '';
    this.orderTitle = '';
  }

  ngOnInit() {
  }

  /**
   * Clear the form
   */
  clear() {
    this.orderBody = '';
    this.orderTitle = '';
  }

  /**
    * Submit a new order if the form is valid
   */
  submitNewOrder(): void {
    // TODO: Form Validation
    // TODO: Use Angular pipes to trim
    const order = new Order(this.orderTitle.trim(), this.orderBody.trim());
    // TODO: Discuss Is saving reference count and visual indicators
    this.orderService.create(order).subscribe();
    this.clear();
  }
}
