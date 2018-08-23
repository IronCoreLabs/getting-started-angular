import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
import { IronService, EncryptedDocument } from '../iron/iron.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'api/order';  // URL to web api
  readonly newOrders$: Subject<Order>;
  groupID = '';

  constructor(private http: HttpClient,
              private iron: IronService,
              private snackbar: SnackBarService) {
    this.newOrders$ = new Subject<Order>();
  }

  create(order: Order): Observable<Order> {
    order.date = new Date();
    return this.http.post<Order>(this.url, order)
      .pipe(
        tap((o) => this.newOrders$.next(o))
      );
  }

  list(): Observable<EncryptedDocument> {
    return this.http.get<EncryptedDocument>(this.url);
  }
}
