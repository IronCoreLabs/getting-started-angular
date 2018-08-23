export function Ironable(policy): ClassDecorator {
  return function(constructor: any) {
      constructor.prototype.__ironpolicy = policy;
  };
}
