import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { IronPolicy } from './iron-policy';

/**
 * Default factory for creating IronPolicy objects from HttpRequests, etc.
 *
 * The factory is instantiated using dependency injection.
 */
@Injectable({ providedIn: 'root' })
export class IronPolicyFactory {
    from(request: HttpRequest<any>): IronPolicy {
        return new IronPolicy(request);
    }
}
