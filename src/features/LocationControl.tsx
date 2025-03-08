import LocationItem from '@/components/LocationItem';
import { useSearch, useLocation } from '@/stores';
import { useDebouncedCallback } from 'use-debounce';
import { LocationColors } from '@/config/colors';

export default function LocationControl() {
  const { interims, addInterim, removeInterim } = useLocation();
  const { setSearchQuery } = useSearch();

  const onChange = useDebouncedCallback((id: string, text: string) => {
    setSearchQuery(id, text);
  }, 1000);

  const canDelete = interims.length > 2;

  return (
    <div className="flex flex-col gap-2 px-4">
      <ul className="list">
        {interims.map((interim, index) => (
          <LocationItem
            key={interim.id}
            color={LocationColors[index]}
            interim={interim}
            isOrigin={index == 0}
            onQueryChange={onChange}
            onRemoveItem={removeInterim}
            canDelete={canDelete}
          />
        ))}
      </ul>
      {interims.length < 5 && (
        <button className="btn btn-outline btn-primary" onClick={addInterim}>
          Add another destination
        </button>
      )}
    </div>
  );
}
