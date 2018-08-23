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

  constructor(private orderService: OrderService) {
    // TODO: icon classes
    this.iconClasses = [];
    this.orderBody = '';
    this.orderTitle = '';
  }

  ngOnInit() {
  }

  clear() {
    this.orderBody = '';
    this.orderTitle = '';
  }

  /**
    * Submit a new order if the form is valid
   */
  submitNewOrder(): void {
    // TODO: Form Validation
    const order = new Order(this.orderTitle.trim(), this.orderBody.trim());
    this.orderService.create(order).subscribe();
    this.clear();
  }

     /*
    submitNewOrder() {
      if (this.state.savingOrder || !this.state.orderTitle.trim() || !this.state.orderBody.trim()) {
          return;
      }
      this.setState({savingOrder: true});
      this.props.createOrder(
          this.state.orderTitle.trim(),
          this.state.orderBody.trim(),
          () => {
              this.setState({savingOrder: false, orderTitle: "", orderBody: ""});
              showSnackbar("New order created successfully");
          },
          () => this.setState({savingOrder: false})
      );
  }
  */
}
