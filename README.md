# Dashboard for tracking Coronavirus (COVID-19) across the UK

## Development

Before running anything create a config file at `src/config.js`, containing: `export const MAPBOX_API_KEY = <mapbox_key>;`.

To run locally `yarn start`.

Before building a production build update the version number in package.json. This will change the built filenames to enable cache busting. 
To build a production build `yarn build`.
