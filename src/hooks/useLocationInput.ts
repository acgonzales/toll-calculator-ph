import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const getSuggestionAsync = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ['origin', 'destination'];
};


function useLocationInput(initialValue: string = '') {
  const [value, setValue] = useState<string>(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const fetchSuggestions = useDebouncedCallback(async (query: string) => {
    if (query.length > 0) {
      const results = await getSuggestionAsync(query);
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