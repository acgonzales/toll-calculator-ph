import { useCallback } from 'react';
import { LocationInterim } from '@/types/common.types';

interface UseLocationSearchProps {
  interim: LocationInterim;
  onQueryChange: (id: string, text: string) => void;
}

export function useLocationSearch({ interim, onQueryChange }: UseLocationSearchProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onQueryChange(interim.id, e.target.value);
    },
    [interim.id, onQueryChange],
  );

  const displayValue = interim.location?.name ?? interim.text;
  const isRealized = !!interim.location;

  return {
    handleChange,
    displayValue,
    isRealized,
  };
}