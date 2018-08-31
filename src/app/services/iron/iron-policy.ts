import { HttpRequest } from '@angular/common/http';

/**
 * IronPolicy defines how transparent transform encryption is applied to
 * http requests, http responses and local storage operations
 */
export class IronPolicy {
    readonly encrypt: Boolean;
    readonly decrypt: Boolean;
    readonly groupId = '';

    constructor(request: HttpRequest<any>) {
        // TODO: guard
        // TODO: object
        // TODO: metadata driven

        this.encrypt = request.body && request.body.__ironpolicy;
        if (this.encrypt) {
            this.decrypt = false;
            this.groupId = request.body.__ironpolicy;
            return;
        }

        this.decrypt = request.url === 'api/order';
    }
}
