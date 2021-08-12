// @flow

import React  from 'react';

import ChangeLogComponent from "components/ChangeLogComponent";
import { Helmet } from "react-helmet";


const WhatsNew = () => {

    return <>
        <Helmet>
            <link type="application/rss+xml"
                  rel="alternate"
                  title="Service logs - RSS feed"
                  href="https://api.coronavirus.data.gov.uk/generic/change_logs/rss.xml"/>
            <link type="application/atom+xml"
                  rel="alternate"
                  title="Service logs - Atom feed"
                  href="https://api.coronavirus.data.gov.uk/generic/change_logs/atom.xml"/>
        </Helmet>
        <ChangeLogComponent/>
    </>;

}; // ChangeLog


export default WhatsNew;
