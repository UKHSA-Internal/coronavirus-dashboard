// @flow

import React from "react";
import { withRouter } from "react-router";
import Map from "components/Map";
import useApi from "hooks/useApi";
import Loading from "components/Loading";
import { getParams } from "common/utils";

const InteractiveMap = ({ location: { search: query } }) => {

    const
        params = getParams(query),
        data = useApi({
            conjunctiveFilters: params || [{key: 'areaType', sign: '=', value: params?.areaType ?? "nation"}],
            structure: ["areaName", "areaCode", "cumCasesByPublishDateRate"],
            defaultResponse: null,
            extraParams: [
                {key: 'latestBy', sign: '=', value: 'cumCasesByPublishDateRate'}
            ]
        });

    if ( !data ) return <Loading/>

    return <Map data={ data } geoKey={ "ctry19" }/>

};


export default withRouter(InteractiveMap);
