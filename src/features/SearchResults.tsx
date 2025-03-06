import { useSearch } from '@/contexts/SearchContext';
import { useSearchSuggestions } from '@/queries/useSearchQuery';

export default function SearchResults() {
  const { searchQuery } = useSearch();
  const { data, isLoading } = useSearchSuggestions();

  return (
    <ul className="list">
      <li className="pb-2 text-xs tracking-wide opacity-60">
        {`Search results for "${searchQuery}"`}
      </li>

      {isLoading && (
        <li className="list-row">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </li>
      )}

      {data?.map((suggestion) => (
        <li key={suggestion.mapbox_id} className="list-row hover:bg-base-300 cursor-pointer">
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
