import { useCallback, useEffect, useState } from 'react';
import { Suggestion, Location } from '@/types/common.types';
import {
  createSession,
  getLocationFromSuggestion,
  getSuggestions,
} from '@/services/location.service';

function useLocationInput(initialValue: string = '') {
  const [session] = useState(createSession());
  const [value, setValue] = useState<string>(initialValue);
  const [location, setLocation] = useState<Location | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (!location) {
      return;
    }
    setValue(location.name);
    setSuggestions([]);
  }, [location]);

  const handleChange = (text: string) => {
    setValue(text);
    getSuggestions(session, text).then((results) => setSuggestions(results));
  };

  const selectSuggestion = useCallback(
    (suggestion: Suggestion) => {
      setValue(suggestion.name);

      getLocationFromSuggestion(session, suggestion).then((location) => {
        setLocation(location);
        setSuggestions([]);
      });
    },
    [session],
  );

  return {
    value,
    location,
    suggestions,
    handleChange,
    selectSuggestion,
    setLocation,
  };
}

export default useLocationInput;
