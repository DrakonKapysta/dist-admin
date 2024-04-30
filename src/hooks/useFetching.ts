import { useState } from 'react';

export const useFetcthing = (callback: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>('');
  const fetching = async (...args: any) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
