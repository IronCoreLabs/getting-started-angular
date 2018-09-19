import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IronService, EncryptedDocument } from './iron.service';
import { IronPolicyFactory } from './iron-policy-factory';

/**
 * Transparently encrypts and decrypts using IronCore transform encryption
 *
 * Encryption and decryption operations are based on an IronPolicy. In a typical
 * use case, the policy is constructed from metadata attached to the data class
 * by the IronEncrypt decorator. You can override the default by providing
 * your own IronPolicyFactory.
 *
 * All encrytion and decryption operations take advantage of RxJS Observable
 * operators and sit in an asynchronous event pipeline.
 */
@Injectable()
export class IronHttpInterceptor implements HttpInterceptor {
    private isTracing = false;

    // TODO: Accept an external trace function
    // TODO: Consider encryption and decryption subject events
    constructor(private iron: IronService, private policyFactory: IronPolicyFactory) {
        this.isTracing = true;
    }

    /**
     * Transparently encrypts, decrypts, or passes through data transfer objects.
     *
     * @param req The request to intercept
     * @param next The next HttpInterceptor in the chain
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Get the policy for this request
        const policy = this.policyFactory.from(req);

        // if policy, encrypt the request on the way out
        if (policy.encrypt) {
            this.trace('pre-encrypt', policy, req);
            return this.iron.encrypt(req.body)
                .pipe(
                    tap((response) => this.trace('post-encrypt', response)),
                    switchMap((response) => next.handle(req.clone({ body: response })))
                );
        }

        // if policy, decrypt the response on the way back in
        if (policy.decrypt) {
            return next.handle(req)
                .pipe(
                    tap((evt) => this.trace('pre-decrypt', policy, req, evt)),
                    switchMap((evt) => this.decrypt(evt)),
                    tap((devt) => this.trace('post-decrypt', devt))
                );
        }

        // Pass through, nothing to do but chain to next
        return next.handle(req).pipe(
            tap((evt) => this.trace('pass-through', req, evt))
        );
    }

    /**
     * Decrypt HttpResponse events as either a JSON object (GET /ID) or JSON
     * Array (GET /)
     * @param evt
     */
    private decrypt(evt: HttpEvent<any>): Observable<HttpEvent<any>> {
        // we only decrypt HttpResponses
        const response = evt as HttpResponse<any>;
        if (!response || !response.body) {
            return of(evt);
        }

        // we may need to decrypt a list of encrypted documents (GET /)
        if (response.body instanceof Array) {
            return this.decryptList(response);
        }

        // If not an array, then it's just one encryted document (GET /ID)
        return this.decryptItem(response);
    }

    /**
     * Decrypt an array of encrypted documents
     *
     * @param response An HttpResponse returning a JSON Array (GET /)
     */
    private decryptList(response: HttpResponse<any>): Observable<HttpEvent<any>> {
        // Each member of the list is the json for an EncryptedDocument
        const list = response.body as any[];

        // Turn the list of json into a list of typed EncryptedDocument
        const edocs = list.map((edoc) => EncryptedDocument.from(edoc));

        // Set up an array of observables, each a separate decryption operation
        // Recall, this only sets up the observables. The pipeline will not fire
        // until an outer subscribe
        const ddocs = edocs.map((edoc) => this.iron.decrypt(edoc));

        // Configure the pipeline to decrypt in parallel and wait for all
        // operations to complete. forkJoin is the observable equivalent of
        // Promise.all. Once we have all of our results clone the response,
        // replacing the body with an array of decrypted documents
        //
        // Note: We could provide preliminary results more quickly by annoucing
        // the completion of each asynchronous decryption. forkJoin will not fire
        // the subscribe until all decryption operations finish
        return forkJoin(ddocs)
            .pipe(
                // The body is now an array of the decrypted document as json
                switchMap((dds) =>
                    of(response.clone({ body: dds.map((dd) => JSON.parse(dd.document)) })))
            );
    }

    /**
     * Decrypt an HttpResponse for a single JSON object
     *
     * @param response An HttpResponse returning a single JSON object (GET /ID)
     */
    private decryptItem(response: HttpResponse<any>): Observable<HttpEvent<any>> {
        // Turn the json body into a typed EncryptedDocument object
        const edoc = EncryptedDocument.from(response.body);

        // Clone the response, replacing the body with the decrypted document
        return this.iron.decrypt(edoc).
            pipe(
                switchMap((dd) => of(response.clone({ body: JSON.parse(dd.document) })))
            );
    }

    // Default trace method
    private trace(...args: any[]) {
        if (this.isTracing) {
            console.log(args);
        }
    }
}
