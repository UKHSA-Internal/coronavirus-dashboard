// @flow

import type { Location } from 'react-router';

export type Props = {|
  location: Location,
  region: string,
  setRegion: (region: string | null) => void,
  regionData: RegionData,
  country: string,
  setCountry: (country: string | null) => void,
  countryData: CountryData, 
|};

