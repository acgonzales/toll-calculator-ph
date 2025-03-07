import LocationItem from '@/components/LocationItem';
import { useSearch } from '@/stores/search/hooks';
import { useDebouncedCallback } from 'use-debounce';

export default function LocationControl() {
  const { locationInterims, addInterim, removeInterim, setSearchQuery } = useSearch();

  const onChange = useDebouncedCallback((id: string, text: string) => {
    setSearchQuery(id, text);
  }, 1000);

  const canDelete = locationInterims.length > 2;

  return (
    <div className="flex flex-col gap-2 px-4">
      <ul className="list">
        {locationInterims.map((interim, index) => (
          <LocationItem
            key={interim.id}
            interim={interim}
            isOrigin={index == 0}
            onQueryChange={onChange}
            onRemoveItem={removeInterim}
            canDelete={canDelete}
          />
        ))}
      </ul>
      <button className="btn btn-outline btn-secondary" onClick={addInterim}>
        Add another destination
      </button>
    </div>
  );
}
