import { LocationInterim } from '@/types/common.types';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useLocationSearch } from '@/hooks/useLocationSearch';

interface LocationItemProps extends React.ComponentPropsWithoutRef<'li'> {
  interim: LocationInterim;
  isOrigin: boolean;
  canDelete: boolean;
  color: string;
  onQueryChange: (id: string, text: string) => void;
  onRemoveItem: (id: string) => void;
}

export default function LocationItem({
  isOrigin,
  className,
  interim,
  canDelete,
  color,
  onQueryChange,
  onRemoveItem,
}: LocationItemProps) {
  const { handleChange, inputValue, isRealized } = useLocationSearch({
    interim,
    onQueryChange,
  });

  const leadingIconCls = clsx('size-6', isRealized && color);

  return (
    <li className={twMerge(className, 'list-row p-1')}>
      <div className="flex items-center">
        {isOrigin ? (
          <HomeIcon className={leadingIconCls} />
        ) : (
          <MapPinIcon className={leadingIconCls} />
        )}
      </div>
      <div>
        <label className="input w-full">
          <MagnifyingGlassIcon className="size-4" />
          <input
            type="text"
            className="grow"
            placeholder="Start typing to search..."
            value={inputValue}
            onChange={handleChange}
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
