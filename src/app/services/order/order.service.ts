import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';

/**
 * OrderService is a simple CRUD wrapper on a REST endpoint.
 *
 * Note that OrderService has no knowledge that data is being encrypted
 * or decrypted. The HttpClient is injected and interceptors are transparently
 * called by the Angular framework.
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'api/order';  // URL to web api

  /**
   * Use the Service/Subject pattern to announce new order creation
   */
  readonly newOrders$: Subject<Order>;

  /**
   * Construct an order service.
   *
   * @param http Injected HttpClient with configured interceptors
   */
  constructor(private http: HttpClient) {
    this.newOrders$ = new Subject<Order>();
  }

  /**
   *
   * @param order The order to be created. The primary key must be unique. The
   * date property is reassigned to the current system clock.
   */
  create(order: Order): Observable<Order> {
    order.date = new Date();
    return this.http.post<Order>(this.url, order)
      .pipe(
        // announce the newly created order
        tap(() => this.newOrders$.next(order)),
        // revive the result to return an actual type instead of a typecast json
        map((o) => Order.revive(o))
      );
  }

  list(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url)
      .pipe(
        // revive the result to return an actual type instead of a typecast json
        map((orders) => orders.map((order) => Order.revive(order)))
      );
  }
}
