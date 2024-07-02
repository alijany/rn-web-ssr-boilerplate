import React, {DependencyList} from 'react';

/**
 * A hook that memoizes the result of a function with a debounce delay.
 *
 * @template FN - The type of the function to be memoized.
 * @param {FN} factory - The function to be memoized.
 * @param {DependencyList} deps - The dependencies to trigger the memoization.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {ReturnType<FN>} The memoized result of the function.
 */
export const useDebouncedMemo = <FN extends (...args: any) => any>(
  factory: FN,
  deps: DependencyList,
  delay: number,
) => {
  const [debouncedValue, setDebouncedValue] = React.useState<ReturnType<FN>>(
    factory(),
  );

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(factory());
    }, delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);

  return debouncedValue;
};
