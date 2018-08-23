import { HttpRequest } from '@angular/common/http';

export class IronPolicy {
    readonly encrypt: Boolean;
    readonly decrypt: Boolean;
    readonly groupId = '';

    constructor(request: HttpRequest<any>) {
        // TODO: guard

        this.encrypt = request.body && request.body.__ironpolicy;
        if (this.encrypt) {
            this.decrypt = false;
            this.groupId = request.body.__ironpolicy;
            return;
        }

        this.decrypt = request.url === 'api/order';
    }
}
