import { useCallback, useEffect, useState } from 'react';
import { Location } from '@/types/common.types';
import {
  createSession,
  getLocationFromSuggestion,
  getSuggestions,
} from '@/services/location.service';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';

function useLocationInput(initialValue: string = '') {
  const [session] = useState(createSession());
  const [value, setValue] = useState<string>(initialValue);
  const [location, setLocation] = useState<Location | null>(null);
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);

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
    (suggestion: SearchBoxSuggestion) => {
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
