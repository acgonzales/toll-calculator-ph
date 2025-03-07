import { SearchBoxSuggestion } from '@mapbox/search-js-core';

interface SearchResultsProps {
  searchQuery: string;
  isSearching: boolean;
  results: SearchBoxSuggestion[];
  onSelect: (suggestion: SearchBoxSuggestion) => void;
}

export default function SearchResults({
  searchQuery,
  results,
  isSearching,
  onSelect,
}: SearchResultsProps) {
  return (
    <ul className="list">
      <li className="pb-2 text-xs tracking-wide opacity-60">
        {`Search results for "${searchQuery}"`}
      </li>

      {isSearching && (
        <li className="list-row">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </li>
      )}

      {results?.map((suggestion) => (
        <li
          key={suggestion.mapbox_id}
          className="list-row hover:bg-base-300 cursor-pointer"
          onClick={() => onSelect(suggestion)}
        >
          <div>
            <div>{suggestion.name}</div>
            <div className="text-xs font-semibold uppercase opacity-60">
              {suggestion.place_formatted}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
