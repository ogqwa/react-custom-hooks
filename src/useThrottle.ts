import * as React from "react";

type FuncWithArgsOrNot<T, U extends unknown[]> =
  | (() => T)
  | ((...args: U) => T);

export function useThrottle<T, U extends unknown[]>(
  fn: FuncWithArgsOrNot<T, U>,
  ms: number,
  args?: U
): FuncWithArgsOrNot<T, U> | (() => void) {
  const lastExecTime = React.useRef<number>();

  return React.useCallback(() => {
    const now = Date.now();
    if (!lastExecTime.current) {
      lastExecTime.current = now;
      return args ? fn(...args) : fn();
    } else {
      if (now - lastExecTime.current > ms) {
        lastExecTime.current = now;
        return args ? fn(...args) : fn();
      }
    }
  }, [fn, ms, args]);
}
