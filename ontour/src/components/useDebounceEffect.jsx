import { useEffect } from 'react';

function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    if (typeof fn === 'function') {
      const t = setTimeout(() => {
        fn();
      }, waitTime);

      return () => {
        clearTimeout(t);
      };
    }
  }, deps);
}

export default useDebounceEffect;

