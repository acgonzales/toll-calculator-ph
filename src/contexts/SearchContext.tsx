import { createContext, useCallback, useContext, useState } from 'react';
import { createSession, SearchBoxSearchSession } from '@/services/location.service';
import { LocationInterim } from '@/types/common.types';
import { v4 as uuidv4 } from 'uuid';

interface SearchContextProps {
  session: SearchBoxSearchSession;
  locationInterims: LocationInterim[];
  searchQuery: string;
  searchId?: string;

  setSearchQuery: (searchId: string, query: string) => void;
  resetSession: () => void;
  addInterim: () => void;
  removeInterim: (id: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

const initialLocationInterims: LocationInterim[] = [{ id: uuidv4() }, { id: uuidv4() }];

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(createSession());
  const [locationInterims, setLocationIterims] =
    useState<LocationInterim[]>(initialLocationInterims);
  const [searchId, setSearchId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQueryOriginal] = useState('');

  const setSearchQuery = useCallback(
    (searchId: string, query: string) => {
      const interim = locationInterims.find((i) => i.id === searchId);
      if (!interim) {
        console.warn('Unrecognized search id: ', searchId);
        return;
      }

      setSearchId(searchId);
      setSearchQueryOriginal(query);
    },
    [locationInterims],
  );

  const resetSession = () => {
    setSession(createSession());
  };

  const addInterim = () => {
    setLocationIterims((prev) => [...prev, { id: uuidv4() }]);
  };

  const removeInterim = (id: string) => {
    setLocationIterims((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <SearchContext.Provider
      value={{
        session,
        locationInterims,
        searchId,
        searchQuery,
        setSearchQuery,
        resetSession,
        addInterim,
        removeInterim,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
