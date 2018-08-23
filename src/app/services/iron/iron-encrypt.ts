export function IronEncrypt(policy): ClassDecorator {
  return function(constructor: any) {
      constructor.prototype.__ironpolicy = policy;
  };
}
