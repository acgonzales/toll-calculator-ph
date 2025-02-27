import { SearchBoxCore, SessionToken } from '@mapbox/search-js-core';

import { Suggestion } from '@/services/location-suggest/types';
import env from '@/config/env';

const searchBoxCore = new SearchBoxCore({
  accessToken: env.MAPBOX_API_KEY,
});

const session = new SessionToken();

const getAddressSuggestions = async (address: string): Promise<Suggestion[]> => {
  const response = await searchBoxCore.suggest(address, {
    sessionToken: session,
  });
  return response.suggestions.map((suggestion) => ({
    id: suggestion.mapbox_id,
    name: suggestion.name,
    address: suggestion.full_address,
  }));
};

export default getAddressSuggestions;
