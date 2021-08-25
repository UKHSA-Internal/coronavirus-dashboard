// @flow

import React from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import { Helmet } from "react-helmet";

import { useParams } from "react-router";
import { PageComponent } from "components/ChangeLogComponent/PageComponent";

import { AnnouncementItem } from "./Announcements";
import type { ComponentType } from "react";
import moment from "moment";
import { Link } from "react-router-dom";


const AnnouncementsRecord: ComponentType<*> = () => {

    const { id } = useParams();

    const data = useGenericAPI(
        "genericApiAnnouncementsRecord",
        null,
        { id: id }
        );

    if ( !data ) return <Loading/>;

    const title = `Announcement - ${moment(data.date).format("D MMMM YYYY")} | Coronavirus in the UK`;

    return <>
        <Helmet>
            <link type="application/rss+xml"
                  rel="alternate"
                  title="Announcements and general updates - RSS feed"
                  href="https://api.coronavirus.data.gov.uk/generic/announcements/rss.xml"/>
            <link type="application/atom+xml"
                  rel="alternate"
                  title="Announcements and general updates - Atom feed"
                  href="https://api.coronavirus.data.gov.uk/generic/announcements/atom.xml"/>
            <title>{ title }</title>
            <meta property="og:title" content={ title }/>
            <meta name="twitter:title" content={ title }/>
        </Helmet>
        <PageComponent filters={ false } feedPath={ "announcements" }>
            <div>
                <Link className="govuk-back-link" to={ "/details/announcements" }>
                    All records
                </Link>
            </div>
            <AnnouncementItem data={ data }/>
        </PageComponent>
    </>;

}; // ChangeLog


export default AnnouncementsRecord;
