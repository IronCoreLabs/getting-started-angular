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
    public readonly bindings = new Map<string, string>();

    private bindIds(policy: IronPolicy): IronPolicy {
        return policy.bindIds(this.bindings);
    }

    from(x: any): IronPolicy {
        return this.bindIds(this._from(x));
    }

    private _from(x: any): IronPolicy {
        if (x instanceof HttpRequest) {
            return new IronPolicy({request: x});
        }

        if (x.__ironpolicy instanceof IronPolicy) {
            return x.__ironpolicy;
        }

        throw new Error(`object type for ${x} not supported`);
    }
}
