import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { suggest } from '@/services/location-suggest';
import { Suggestion } from "@/services/location-suggest/types";


function useLocationInput(initialValue: string = '') {
  const [value, setValue] = useState<string>(initialValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  
  const fetchSuggestions = useDebouncedCallback(async (query: string) => {
    if (query.length > 0) {
      const results = await suggest(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, 1000);
  
  const handleChange = (text: string) => {
    setValue(text);
    fetchSuggestions(text);
  };
  
  const selectSuggestion = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
  };
  
  return {
    value,
    suggestions,
    handleChange,
    selectSuggestion
  };
}

export default useLocationInput;