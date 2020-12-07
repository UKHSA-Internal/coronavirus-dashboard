// @flow

import React  from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import BrowserHistory from "components/BrowserHistory";
import ChangeLogComponent from "components/ChangeLogComponent";

const ChangeLog = () => {

    const data = useGenericAPI("changeLogData", [], "json");

    if ( !data ) return <Loading/>;

    let changeTypes = {};
    if (data.type) {
        Object.keys(data.type).map(key => {
            changeTypes[key] = false;
        });
    };

    const element = <ChangeLogComponent data={data} changeTypes={changeTypes} />

    return <BrowserHistory element={element}/>

}; // ChangeLog


export default ChangeLog;
