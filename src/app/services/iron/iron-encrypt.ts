import { IronPolicy } from './iron-policy';

/**
 * Class decorator that makes it easy to insert transparent transform
 * encryption onto a data transfer object. Note that the decorator is "sugar,"
 * in that you can accomplish everything it does with more control by using the
 * IronPolicyFactor, IronPolicy, etc. classes.
 * @param config Policy configuration
 */
export function IronEncrypt(config): ClassDecorator {
    return (constructor: any) => {
        // The IronHttpInterceptor looks for an __ironpolicy object
        // on post and put requests. Add one to the prototype chain
        // for the decorated target class
        constructor.prototype.__ironpolicy = new IronPolicy({ decorator: config });
    };
}
