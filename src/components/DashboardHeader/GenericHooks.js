// @flow

import { PathNames } from "./Constants";


export const getOrder = ( history ) => {

    const
        defaultOrder = {
            "nation": {
                key: "nation",
                label: "Nations",
                suggestion: "nations",
                lastUpdate: "2020-07-07",
                parent: null
            },
            "region": {
                key: "region",
                label: "Regions",
                lastUpdate: "2020-07-07",
                suggestion: "regions",
                parent: "nation",
            },
            "la": {
                key: "la",
                label: "Local authorities",
                lastUpdate: "2020-07-07",
                suggestion: "local authorities",
                parent: "region",
            },
        };


    switch (history.location.pathname.toLowerCase()) {

        case PathNames.healthcare:
            return {
                nhsNation: {
                    key: "nhsNation",
                    label: "Nations",
                    lastUpdate: "2020-07-07",
                    suggestion: "nations",
                    parent: null
                },
                nhsRegion: {
                    key: "nhsRegion",
                    label: "NHS regions",
                    lastUpdate: "2020-07-07",
                    suggestion: "NHS regions",
                    parent: "nhsNation",
                },
                nhsTrust: {
                    key: "nhsTrust",
                    label: "NHS trusts",
                    lastUpdate: "2020-12-15",
                    suggestion: "NHS trusts",
                    parent: "nhsRegion",
                },

            };

        case PathNames.testing:
        case PathNames.deaths:
        case PathNames.cases:
        default:
            return defaultOrder;

    }  // switch

};  // getOrder
