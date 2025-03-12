import { useCallback, useEffect, useState } from 'react';
import { LocationInterim } from '@/types/common.types';

interface UseLocationSearchProps {
  interim: LocationInterim;
  onQueryChange: (id: string, text: string) => void;
}

export function useLocationSearch({ interim, onQueryChange }: UseLocationSearchProps) {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(interim.location?.name ?? interim.text ?? '');
  }, [interim.location, interim.text]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onQueryChange(interim.id, newValue);
    },
    [interim.id, onQueryChange],
  );

  const isRealized = !!interim.location;

  return {
    handleChange,
    inputValue,
    isRealized,
  };
}
