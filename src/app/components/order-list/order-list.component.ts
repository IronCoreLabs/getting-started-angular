import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../services/order/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.newOrders$.subscribe((order) => {
      this.orderList.push(order);
    });
  }

  ngOnInit() {
    this.orderService.list().subscribe((response) => console.log(response));
  }

}

  //   /**
  //    * Get list of orders and display them as individual rows
  //    */
  //   getAwayTeamOrders() {
  //     const ordersArray = Object.keys(this.props.orders)
  //         .map((orderID) => this.props.orders[orderID])
  //         .sort((a, b) => a.created > b.created);

  //     if (ordersArray.length === 0) {
  //         return (
  //             <div className={classes.emptyOrderList}>
  //                 <div>No orders created yet.</div>
  //             </div>
  //         );
  //     }
  //     return ordersArray.map((order) => {
  //         return (
  //             <div key={order.id} className={classes.orderRow} onClick={() => this.expandRow(order.id)}>
  //                 <div className={classes.orderHeader}>
  //                     <AvatarHoverAction src={insignia} size={45} />
  //                     <div className={classes.todoTitle}>{order.title}</div>
  //                     <div className={classes.timestamp}>{new Date(order.created).toLocaleTimeString()}</div>
  //                 </div>
  //                 {this.getOrderBody(order)}
  //             </div>
  //         );
  //     });
  // }
