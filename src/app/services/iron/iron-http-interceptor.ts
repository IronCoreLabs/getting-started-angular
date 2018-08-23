import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { IronService } from './iron.service';

import 'reflect-metadata';
import { EncryptedDocumentResponse } from '@ironcorelabs/ironweb';
import { IronPolicy } from './iron-policy';
import { IronPolicyFactory } from './iron-policy-factory';

@Injectable()
export class IronHttpInterceptor implements HttpInterceptor {

  constructor(private iron: IronService, private policyFactory: IronPolicyFactory) {
      console.log('IronHttpInterceptor Transform Encryption is Active');
  }

  /**
   * Transparently encrypts and decrypts data transfer objects that have
   * an associated IronEncrypt policy. Any other payload is not modified.
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the policy for this request
    const policy = this.policyFactory.from(req);

    // If we're encrypting, encrypt the request on the way out
    if (policy.encrypt) {
      console.log('before encryption body: ', req.body);
      return this.iron.encrypt(req.body)
        .pipe(
          tap((response) => console.log('after encryption: ', response)),
          switchMap((response) => next.handle(req.clone({body: response})))
        );
    }

    // If we're decrypting, decrypt the response on the way back in
    if (policy.decrypt) {
      return next.handle(req)
        .pipe(
          tap((evt) => console.log('HttpEvent', evt)),
          switchMap((evt) => this.decrypt(evt))
        );
    }

    // Pass through the request and response without modifying
    return next.handle(req);
  }

  private decrypt(evt: HttpEvent<any>): Observable<HttpEvent<any>> {
    return of(evt);
  }

          /*
        .subscribe((evt) => {
          // Skip over anything that isn't an HttpResponse
          if (!(evt instanceof HttpResponse)) {
            return evt;
          }

          // Handle list of DTOs to decrypt
          if (evt.body && evt.body instanceof Array) {
            const dbody = evt.body.map((x) => this.iron.decrypt(x)
              .subscribe((response) => {
                console.log(response);
                return response.data;
              }));
            return evt.clone({ body: dbody});
          }

          // Handle single DTO to decrypt
          console.log(evt);
          return this.iron.decrypt(evt.body)
            .subscribe((response) => {
              return evt.clone({ body: response.data});
            });
        });
        */
}
