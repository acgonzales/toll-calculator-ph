import { LocationInterim } from '@/types/common.types';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface LocationItemProps extends React.ComponentPropsWithoutRef<'li'> {
  interim: LocationInterim;
  isOrigin: boolean;
  canDelete: boolean;
  onQueryChange: (id: string, text: string) => void;
  onRemoveItem: (id: string) => void;
}

export default function LocationItem({
  isOrigin,
  className,
  interim,
  canDelete,
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
      <div
        className={clsx('flex items-center', canDelete && 'tooltip tooltip-bottom')}
        data-tip="Remove location"
      >
        <button
          disabled={!canDelete}
          className="btn btn-square btn-ghost"
          onClick={() => onRemoveItem(interim.id)}
        >
          <XCircleIcon
            className={clsx('size-6', 'transition-all', canDelete ? 'text-error' : 'text-gray-700')}
          />
        </button>
      </div>
    </li>
  );
}
