import { HttpRequest } from '@angular/common/http';

/**
 * IronPolicy defines how transparent transform encryption is applied to
 * http requests, http responses and local storage operations
 */
export class IronPolicy {
    readonly encrypt: Boolean = false;
    readonly decrypt: Boolean = false;
    groupId = '';

    constructor(config: any) {
        // TODO: guard
        // TODO: object
        // TODO: metadata driven
        if (config.decorator) {
            this.groupId = config.decorator.groupId;
            this.encrypt = true;
            this.decrypt = true;
            return;
        }

        if (config.request) {
            const request: HttpRequest<any> = config.request;
            this.encrypt = request.body && request.body.__ironpolicy;
            if (this.encrypt) {
                const policy: IronPolicy = request.body.__ironpolicy;
                this.decrypt = false;
                this.groupId = policy.groupId;
                return;
            }

            this.decrypt = true; // auto-detects encrypted payload
        }
    }

    bindIds(bindings: Map<string, string>): IronPolicy {
        // TODO: make a general parse and make it functional
        if (this.groupId.startsWith('[') && this.groupId.endsWith(']')) {
            const key = this.groupId.substring(1, this.groupId.length - 1);
            const groupId = bindings.get(key);
            if (!groupId) {
                throw new Error(`No group id binding for key ${key}`);
            }
            this.groupId = groupId;
        }
        return this;
    }
}
