import { ChangeEvent } from 'react';

type LocationInputProps = {
  label: string;
  value: string;
  suggestions: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectSuggestion: (value: string) => void;
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
        <ul className="menu bg-base-200 absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => selectSuggestion(suggestion)}>
              <a className="hover:bg-base-300">{suggestion}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationInput;
