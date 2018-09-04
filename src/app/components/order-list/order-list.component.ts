import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../services/order/order';
import { UserService } from '../../services/user/user.service';
import { IronStatus } from '../../services/iron/iron-status';

// TODO: Discuss warning panel in React app, don't have it here, not sure it's needed

/**
 * Simple view model to generate an Access Denied title on IronWeb.SDKErrors
 */
class OrderViewModel {
    constructor(public order: Order) {
    }

    get date(): Date {
        return this.order.date;
    }

    get message(): string {
        return this.order.message;
    }

    get title(): string {
        const status = this.order['__ironstatus'] as IronStatus;
        if (!status || !status.isError) {
            return this.order.title;
        }

        if (status.sdkError.code === 301) {
            return 'Access Denied';
        }
        return status.sdkError.message;
    }
}

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    @Input() orders: OrderViewModel[] = [];

    // Initialization

    constructor(private orderService: OrderService, private userService: UserService) {
        this.orderService.newOrders$.subscribe((order) => {
            this.orders.push(new OrderViewModel(order));
        });
    }

    ngOnInit() {
        this.refresh();
        this.userService.userChanging.subscribe(() => this.refresh());
    }

    // Properties

    @Input() get isEmptyOrderList(): Boolean {
        return this.orders.length === 0;
    }

    // Methods

    /**
     * Refreshes the order list from the (mocked) back end
     */
    refresh() {
        this.orders = [];
        this.orderService.list().subscribe((result: Order[]) => {
            this.orders = result.sort((a, b) => a.date > b.date ? 1 : -1)
                .map((x) => new OrderViewModel(x));
        });
    }
}
