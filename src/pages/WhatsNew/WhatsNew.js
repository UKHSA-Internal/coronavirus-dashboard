// @flow

import React  from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import BrowserHistory from "components/BrowserHistory";
import ChangeLogComponent from "components/ChangeLogComponent";
import { Helmet } from "react-helmet";

const WhatsNew = () => {

    const data = useGenericAPI("changeLogData", [], "json");

    if ( !data ) return <Loading/>;

    return <>
        <Helmet>
            <title>What's new | Coronavirus in the UK</title>
            <meta name="description" content="Log of changes to different parts of the service." />
        </Helmet>
        <ChangeLogComponent data={data?.changeLog ?? []} colours={ data?.colours ?? [] }/>
    </>

}; // ChangeLog


export default WhatsNew;
