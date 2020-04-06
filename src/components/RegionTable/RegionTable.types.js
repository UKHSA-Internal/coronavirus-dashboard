// @flow

import type { Location } from 'react-router';

export type Props = {|
  country: string,
  setCountry: (country: string | null) => void,
  countryData: CountryData, 
  region: string,
  setRegion: (region: string | null) => void,
  regionData: RegionData,
  utla: string,
  setUtla: (utla: string | null) => void,
  utlaData: UtlaData,
  history: { push: Function },
  location: Location,
|};

