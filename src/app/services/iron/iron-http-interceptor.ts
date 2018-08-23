import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IronService } from './iron.service';

import 'reflect-metadata';
import { EncryptedDocumentResponse } from '@ironcorelabs/ironweb';

@Injectable()
export class IronHttpInterceptor implements HttpInterceptor {

  constructor(private iron: IronService) {
      console.log('IronHttpInterceptor Transform Encryption is Active');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log(req);

    const policy = this.getPolicy(req);
    if (policy) {
      // Guard assertions
      console.log('before encryption body: ', req.body);
      this.iron.encrypt(req.body)
        .subscribe((response) => {
          console.log('after encryption: ', response);
          return next.handle(req.clone({ body: response}));
        });
    }
    return next.handle(req);
  }

  private getPolicy(request: HttpRequest<any>) {
    return request.body && request.body['__ironpolicy'];
  }
}
