import * as IronWeb from '@ironcorelabs/ironweb';

/**
 * It's often the case that encryption and decryption errors can be handled
 * as part of a normal return object instead of an error exception.
 *
 * IronStatus wraps an IronWeb.SDKError to help implement this error handling
 * pattern. The IronHttpInterceptor attaches IronStatus to decorated data
 * transfer classes.
 */
export class IronStatus {
    constructor(public sdkError?: IronWeb.SDKError) {
        if (!sdkError) {
            this.sdkError = null;
        }
    }

    get isError(): Boolean {
        return this.sdkError && this.sdkError.code !== 0;
    }
}
