import { Suggestion } from '@/types/common.types';
import { ChangeEvent } from 'react';

type LocationInputProps = {
  label: string;
  value: string;
  suggestions: Suggestion[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectSuggestion: (value: Suggestion) => void;
};

function LocationInput({
  label,
  value,
  onChange,
  suggestions,
  selectSuggestion,
}: LocationInputProps) {
  return (
    <div className="relative">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{label}</legend>
        <input
          type="text"
          className="input w-full"
          placeholder="Start typing to search..."
          value={value}
          onChange={onChange}
        />
      </fieldset>

      {suggestions.length > 0 && (
        <ul className="menu menu-vertical bg-base-200 absolute z-10 mt-1 w-full rounded-md shadow-md">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="hover:bg-base-300 w-full cursor-pointer rounded-md"
              onClick={() => selectSuggestion(suggestion)}
            >
              <div className="leading-tight font-semibold hover:bg-inherit">{suggestion.name}</div>
              {suggestion.address && (
                <>
                  <div className="w-full text-xs text-gray-500 hover:bg-inherit">
                    {suggestion.address}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationInput;
