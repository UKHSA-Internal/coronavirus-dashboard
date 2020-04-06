// @flow

import type { Location } from 'react-router';

export type Props = {|
  country: string,
  setCountry: (country: string | null) => void,
  countryData: CountryData, 
  nhsRegion: string,
  setNhsRegion: (region: string | null) => void,
  nhsRegionData: RegionData,
  localAuthority: string,
  setLocalAuthority: (utla: string | null) => void,
  localAuthorityData: UtlaData,
  history: { push: Function },
  location: Location,
|};

