// @flow

import React, { useState, useEffect } from 'react';

import moment from "moment";

import { createQuery, getParams, groupBy, strFormat } from "common/utils";

import { MonthlyGroup, MonthlyHeader } from './ChangeLogComponent.styles';

import type { ChangeLogInputProps } from "./ChangeLogComponent.types";
import type { ComponentType } from "react";

import { ChangeLogItem } from "./ChangeLogItem";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import URLs from "common/urls";
import Loading from "components/Loading";
import { useHistory, useParams } from "react-router";
import usePrevious from "hooks/usePrevious";

import { PageComponent } from "./PageComponent";


const ChangeLogItemHeader: ComponentType = ({ date }) => {

    return <MonthlyHeader>
        <h2 className={ "govuk-heading-m" } id={ `monthly_${date}` }>
            <time dateTime={ date }>
                <span className={ "govuk-visually-hidden" }>
                    List of changes in the month of
                </span>
                { moment(date).format("MMMM YYYY") }
            </time>
        </h2>
    </MonthlyHeader>;

}; // ChangeLogItemHeader


const DateGroup: ComponentType = ({ data, group, changeTypes }) => {

    return <MonthlyGroup aria-describedby={ `monthly_${group}` }>
        <ul className={ "govuk-list" }>
            <ChangeLogItemHeader date={ group }/>
            {
                data.map(change =>
                    <ChangeLogItem id={ `cl-item-${ change.id }` }
                                   key={ `cl-item-${ change.id }` }
                                   data={ change }
                                   changeTypes={ changeTypes }/>
                )
            }
        </ul>
    </MonthlyGroup>;

};  // DateGroup



const ChangeLogComponent: ComponentType<*> = ({ colours }: ChangeLogInputProps) => {

    const history = useHistory();
    const { search: query, pathname } = history.location;
    let params = getParams(query);
    const currUri = `${pathname}/${createQuery(params)}`;
    const prevUri = usePrevious();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const { date } = useParams();
    const [metadata, setMetadata] = useState({});
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(1);


    useEffect(() => {

        if ( currUri !== prevUri ) {
            setPage(1);
            setData({});
        }

    }, [currUri, prevUri]);


    useEffect(() => {

        setIsLoading(page === 1);

        (async () => {

            const queryParams = {};
            for ( const { key, value } of getParams(query) ) {
                queryParams[key] = value;
            }

            try {

                const { data: resp, status } = await axios.get(
                    !date
                        ? URLs.genericApiChangeLogs
                        : strFormat(URLs.genericApiDatedChangeLogs, { kwargs: { date } }),
                    {
                        responseType: "json",
                        params: { page, ...queryParams }
                    }
                );

                if ( status < 400 && status !== 204 ) {

                    if ( page === 1 ) {
                        setData(resp.data);
                        setDataLength(resp.length);
                    } else {
                        setData(prev => ([ ...prev, ...resp.data ]));
                        setDataLength(prev => prev + resp.length);
                    }

                    setMetadata(
                        Object.keys(resp)
                            .reduce((acc, cur) =>
                                    cur !== "data" ? { ...acc, [cur]: resp[cur] } : acc,
                                {}
                            )
                    );

                    setIsLoading(false);
                }
                else {
                    setIsLoading(false);
                }

            } catch (e) {
                setData(data => ({...data}))
                console.log("error")
                console.error(e)
                setIsLoading(false);
            }
        })();

    }, [page, query, date]);

    if ( data !== undefined && !data.length && !isLoading ) {
        return <PageComponent>
            <p className={ "govuk-!-font-weight-bold" }>
                There are no logs that match the criteria.
            </p>
        </PageComponent>;
    }

    if ( isLoading ) {
        return <PageComponent><Loading/></PageComponent>;
    }

    const processedData = groupBy(data ? data : [], item => item.date.substring(0, 7));
    const groups = Object.keys(processedData);

    return <PageComponent feedPath={ "change_logs" }>
        <p className={ "govuk-!-margin-left-1" }>
            We regularly update the dashboard with new data and features.
            Here is a timeline of changes.
        </p>
        <InfiniteScroll
            dataLength={ dataLength }
            next={ () => setPage(metadata.page + 1) }
            hasMore={ page < metadata.total_pages }
            loader={ <Loading/> }
            endMessage={
                <p className={ "govuk-body govuk-!-margin-7" } style={{ textAlign: 'center' }}>
                  <b>There are no more logs to display.</b>
                </p>
            }
        >
            <ul className={ "govuk-list" }>{
                groups.map(groupKey =>
                    <DateGroup data={ processedData[groupKey] }
                               group={ groupKey }
                               changeTypes={ [] }
                               colours={ {} }
                               key={ groupKey }/>
                )
            }</ul>
        </InfiniteScroll>
    </PageComponent>;

}; //ChangeLogComponent

export default ChangeLogComponent;
