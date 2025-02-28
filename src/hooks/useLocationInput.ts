import { useCallback, useEffect, useState } from 'react';
import { Suggestion, Location } from '@/types/common.types';
import { LocationService } from '@/services/location.service';

function useLocationInput(initialValue: string = '') {
  const [locationService, _] = useState<LocationService>(new LocationService());
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
    locationService.suggest(value).then((results) => setSuggestions(results));
  };

  const selectSuggestion = useCallback(
    (suggestion: Suggestion) => {
      setValue(suggestion.name);

      locationService.retrieve(suggestion).then((location) => {
        setLocation(location);
        setSuggestions([]);
      });
    },
    [locationService],
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
