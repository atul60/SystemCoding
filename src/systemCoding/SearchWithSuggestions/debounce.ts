export function debounce<T extends unknown[], P>(
  fn: (...args: T) => P,
  delay: number
): Function {
  let latestArgs: T | null = null;
  let timeId: any = null;
  return function (this: any, ...arg: T) {
    if (!latestArgs && !timeId) {
      fn(...arg);
    } else {
      clearTimeout(timeId);
      latestArgs = arg;
    }
    timeId = setTimeout(() => {
      if (latestArgs) {
        fn.call(this, ...latestArgs);
        latestArgs = null;
      }
    }, delay);
  };
}
