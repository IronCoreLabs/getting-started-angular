import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { IronPolicy } from './iron-policy';

@Injectable({ providedIn: 'root' })
export class IronPolicyFactory {
    from(request: HttpRequest<any>): IronPolicy {
        return new IronPolicy(request);
    }
}
