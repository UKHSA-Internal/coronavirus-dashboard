// @flow

import React from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import { Helmet } from "react-helmet";

import { useParams } from "react-router";
import { PageComponent } from "components/ChangeLogComponent/PageComponent";
import { ChangeLogItemBody } from "components/ChangeLogComponent/ChangeLogItem";

import type { ComponentType } from "react";
import moment from "moment";
import { Link } from "react-router-dom";


export const AnnouncementItem: ComponentType<*> = ({ data, children }) => {

    return <section className="govuk-body-s govuk-!-margin-top-6"
                    style={{ maxWidth: 50 + "em" }}>
        <h3 className={ `govuk-heading-s govuk-!-font-size-24 govuk-!-margin-bottom-1` }>
            <small className={ "govuk-caption-m govuk-!-font-size-19 govuk-!-margin-bottom-1" }>
                <time dateTime={ data.date }>
                    <span className={ "govuk-visually-hidden" }>Log date:</span>
                    { moment(data.date).format("D MMMM YYYY") }
                </time>
            </small>
        </h3>
        <p className={ "govuk-!-font-size-14 govuk-!-margin-top-0" }>
            <Link to={ `/details/announcements/${data.id}` }
                  className={ "govuk-link" }>
                Permanent link
            </Link>
        </p>
        <ChangeLogItemBody data={ data }/>
        { children }
    </section>;

}; // AnnouncementRecord


const Announcements: ComponentType<*> = () => {

    const { id } = useParams();

    const data = useGenericAPI(
        "genericApiAnnouncements",
        null,
        { id: id }
        );

    if ( !data ) return <Loading/>;

    const lastItemIndex = data?.length - 1;

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
        </Helmet>
        <PageComponent filters={ false } feedPath={ "announcements" }>
            <ul className={ "govuk-list" }>{
                data.map((item, index) => <li key={ item.id }>
                    <AnnouncementItem data={ item }>
                        {
                            index !== lastItemIndex
                            ? <hr className={ "govuk-section-break govuk-section-break--visible govuk-section-break--l" }/>
                            : null
                        }
                    </AnnouncementItem>
                </li>)
            }</ul>
        </PageComponent>
    </>;

}; // ChangeLog


export default Announcements;
