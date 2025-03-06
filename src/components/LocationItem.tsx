import { LocationInterim } from '@/types/common.types';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

interface LocationItemProps extends React.ComponentPropsWithoutRef<'li'> {
  interim: LocationInterim;
  isOrigin: boolean;
  onQueryChange: (id: string, text: string) => void;
  onRemoveItem: (id: string) => void;
}

export default function LocationItem({
  isOrigin,
  className,
  interim,
  onQueryChange,
  onRemoveItem,
}: LocationItemProps) {
  return (
    <li className={twMerge(className, 'list-row p-1')}>
      <div className="flex items-center">
        {isOrigin ? <HomeIcon className="size-6" /> : <MapPinIcon className="size-6" />}
      </div>
      <div>
        <label className="input w-full">
          <MagnifyingGlassIcon className="size-4" />
          <input
            type="text"
            className="grow"
            placeholder="Start typing to search..."
            value={interim.text}
            onChange={(e) => onQueryChange(interim.id, e.target.value)}
          />
        </label>
      </div>
      <div className="tooltip tooltip-bottom flex items-center" data-tip="Remove location">
        <button className="btn btn-square btn-ghost" onClick={() => onRemoveItem(interim.id)}>
          <XCircleIcon className="text-error size-6" />
        </button>
      </div>
    </li>
  );
}
