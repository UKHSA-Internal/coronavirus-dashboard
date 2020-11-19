// @flow

import React, { useState, useEffect } from 'react';

import Select from "react-select"; 

import DayPickerInput from "react-day-picker/DayPickerInput";

import {AreaTypeOptions} from "components/DashboardHeader/Constants";

import {
    Container,
    DatePickerContainer,
    DownloadLink,
    Form,
    MainContent,
    PermaLink,
    SideContent,
    Formset
} from "./Download.styles"

import moment from "moment";

import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";

import URLs from "common/urls";


import { createQuery, groupBy, sort } from 'common/utils/utils';

import Loading from "components/Loading";

import { Radio } from 'components/GovUk';
import useDownloadData from 'hooks/useDownloadData';
import useTimestamp from 'hooks/useTimestamp';

import type { ComponentType } from "react";
import useApi from "hooks/useApi";


const MAX_METRICS = 5;
const MIN_ARCHIVE_DATE = "2020-08-12";


const dataFormatOptions = {   
    choices: [
        { label: "CSV", value: "csv"  },
        { label: "JSON", value: "json" },
        { label: "XML", value: "xml" },
        { label: "JSONL", value: "jsonl" }
    ]
};

const dataReleaseDateOptions = {   
    choices: [
        { label: "Latest", value: "latest", required: true },
        { label: "Archive", value: "archive", required: true }
    ]
};


const excludedMetrics = [
    "date",
    "areaName",
    "areaType",
    "areaCode",
    "areaNameLower"
];


const SelectOptions = {
    control: ( base, state ) => ({
        ...base,
        boxShadow: state.isFocused ? "0 0 0 3px #fd0" : "none"
    }),
    menu: provided => ({
        ...provided,
        borderRadius: 0,
        backgroundColor: "rgba(241, 241, 241, 0.99)",
        padding: 5
      }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isFocused ? "#1d70b8": "none",
        color: state.isFocused ? "#f1f1f1": "#000",
        ":before": {
            content: state.isSelected ? '"✓ "' : '""'
        }
    }),
    placeholder: styles => ({
        ...styles,
        color: "#6B7276"
    })
};


const ExtendedOptionStyles = Object.create(SelectOptions);
ExtendedOptionStyles.control = ( base, state ) => ({
    ...base,
    boxShadow: state.isFocused ? "0 0 0 3px #fd0" : "none",
    // height: "auto",
    // minHeight: "auto"
});


const formatUrl = ({ ...props }) => {

    const processParams = ( paramItems ) => {

        const queryParams = [];

        for ( const param in paramItems ) {

            if ( !paramItems.hasOwnProperty(param) || !(paramItems?.[param]) ) continue;

            if ( !Array.isArray(paramItems[param]) ) {

                queryParams.push({ key: param, sign: "=", value: paramItems[param] });

            }
            else if ( paramItems[param]?.length ) {

                queryParams.push(
                    ...paramItems[param]
                        .map(value => processParams({metric: value})[0])
                );

            }

        }

        return queryParams

    }

    return createQuery(processParams(props), "&", "?", false)

};  // formatUrl


const FormItem: ComponentType<*> = ({ children, width="one-half", ...props }) => {

    return <Formset width={ width} { ...props }>
        { children }
    </Formset>

};  // FormItem


const AreaTypeSelector = ({ areaType, setAreaType }) => {

    return <FormItem width={ "one-half govuk-!-margin-top-3" }>
        <span id={ "areatype-label" } className={ "govuk-label govuk-label--s" }>
            Area type
        </span>
        <p id={ "areatype-descr" }
           className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1" }>
            Required.
        </p>
        <div aria-labelledby={ "areatype-label" } aria-describedby={ 'areatype-descr' }>
            <Select options={ AreaTypeOptions }
                    value={ AreaTypeOptions.filter(item => item.value === areaType) }
                    onChange={ ({value}) => setAreaType(value) }
                    styles={ SelectOptions }
                    placeholder={ "Select area type" }
                    className={ 'select' }/>
        </div>
    </FormItem>

};  // AreaTypeSelector


const AreaNameSelector = ({ areaType, areaCode, setAreaCode }) => {

    const [areaNameData, setAreaNameData] = useState({ grouped: {}, data: [] });
    const areaNameOptions = useApi({
             disjunctiveFilters:
                 (areaType && areaType !== "overview")
                     ? [{ key: "areaType", sign: '=', value: areaType }]
                     : [],
             structure: {
                 areaName: "areaName",
                 areaCode: "areaCode",
                 areaType: "areaType"
             },
             endpoint: "lookupApi",
             defaultResponse: []
        });

    useEffect(() => {
        const
            groupedAreaNameData = groupBy(areaNameOptions || [], item => item.areaCode),
            areaNameDataPrepped = Object
                .keys(groupedAreaNameData)
                .map(code => ({
                    value: code,
                    label: groupedAreaNameData[code][0].areaName,
                    areaType: groupedAreaNameData[code][0].areaType
                }));

        setAreaNameData({ grouped: groupedAreaNameData, data: areaNameDataPrepped })
    }, [ areaNameOptions ]);

    return <FormItem width={ "one-half" }>
        <span id={ "areaname-label" } className={ "govuk-label govuk-label--s" }>
            Area name
        </span>
        <p className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1" }
           id={ "areaname-descr" }>
            Optional. Leave blank to download the data for all locations in your selected
            area type.
        </p>
        <div aria-labelledby={ "areaname-label" } aria-describedby={ 'areaname-descr' }>
            <Select options={ areaNameData.data }
                    styles={ SelectOptions }
                    value={ areaNameData.data.filter(item => item.value === areaCode) }
                    isLoading={ areaNameOptions.length < 1 && areaType && areaType !== "overview" }
                    placeholder={ "Select area" }
                    isDisabled={ !areaType || areaType === "overview" }
                    onChange={ ({value}) => setAreaCode(value) }
                    className={ 'select' }/>
        </div>
    </FormItem>

};  // AreaNameSelector


const MetricMultiSelector = ({ metrics, setMetrics }) => {

    const
        metricData = useDownloadData("metrics",{}),
        [error, setError] = useState(null),
        metricNames = Object
            .keys(metricData)
            .filter(item => !excludedMetrics.includes(item))
            .sort(sort)
            .reverse()
            .map(item => ({
                label: item,
                value: item
            }));

    useEffect(() => {
        setError(
            metrics?.length && metrics.length > MAX_METRICS
                ? "Too many metrics: you must select between 1 and 5 metrics."
                : null
        )
    }, [ metrics])

    return <FormItem width={ `full` } error={ error !== null  }>
        <span id={ "metrics-label" } className={ "govuk-label govuk-label--s" }>
            Metrics
        </span>
        <div id={ "metrics-descr" }>
            <p className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1 govuk-!-margin-bottom-0" }>
                Required. Select up to 5 metrics. Some metrics may not be available for
                your selected area type. Such metrics will still be included in the resulting
                document, but will not contain any data.
            </p>
            <p className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1" }>
                Records contain 4 additional default metrics as follows: areaType, areaCode, areaName, date
            </p>
            {
                error &&
                <span className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> { error }
                </span>
            }
        </div>
        <div aria-labelledby={ "metrics-label" }
            aria-describedby={ 'metrics-descr' }>
            <Select options={ metricNames }
                    value={ metricNames.filter(obj => metrics.includes(obj.value)) }
                    onChange={ e => setMetrics(Array.isArray(e) ? e.map(item => item.value) : []) }
                    styles={ ExtendedOptionStyles }
                    isLoading={ metricNames.length < 1 }
                    placeholder={ "Select Metrics" }
                    className={ 'select' }
                    isMulti/>
        </div>
    </FormItem>

};  // MetricMultiSelector


const ArchiveDatePicker = ({ display=true, date, setDate, minDate }) => {

    if ( !display ) return null;

    return <DatePickerContainer>
        <div id={ "archive-descr" }>
            <p className="govuk-body-s govuk-!-margin-top-1">
                The archives in our current database include all publications
                since 12 April 2020. The records are provided exactly as they were
                published on a specific date. They include every available figure for
                the selected metrics from the start of the pandemic up to and including
                the date that you select. The records will <u>not</u> include any data
                or metrics that have since been added to the data, nor will they
                contain any changes, corrections, or adjustments.
            </p>
            <div className="govuk-warning-text govuk-!-margin-bottom-2 govuk-!-font-size-16">
                <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                <strong className="govuk-warning-text__text govuk-!-font-size-16">
                    <span className="govuk-warning-text__assistive">Warning</span>
                    The calculation methodology for some metrics may have changed
                    over time. This means that archive records may not be directly
                    comparable to each other on different release dates. See
                    the <a href={ "/details/about-data" }
                           target={ "_blank" }
                           rel={ "noopener noreferrer" }
                           className={ "govuk-link govuk-link--no-visited-state" }>
                        About the data
                    </a> page for additional information.
                </strong>
            </div>
            <p className={ "govuk-hint govuk-!-font-size-16" }>
            Select or type in a date formatted as "YYYY-MM-DD"
            </p>
        </div>
        <span id={ "archive-label" } className={ "govuk-visually-hidden" }>
            Archive date
        </span>
        <div aria-describedby={ "archive-descr" }
             aria-labelledby={ "archive-label" }>
            <DayPickerInput
                formatDate={ formatDate }
                parseDate={ parseDate }
                placeholder={ "Select date" }
                format={ "YYYY-MM-DD" }
                // inputProps={{ disabled: archivedDateDisabled }}
                onDayChange={ value => setDate(moment(value).format("YYYY-MM-DD")) }
                value={ date }
                dayPickerProps={ {
                    locale: 'en-gb',
                    localeUtils: MomentLocaleUtils,
                    disabledDays: [{
                        before: new Date(minDate),
                        after: moment().toDate()
                    }]
                }}
            />
        </div>
    </DatePickerContainer>

};  // ArchiveDatePicker


const SupplementaryDownloads: ComponentType<*> = ({ ...props }) => {

    const data = useDownloadData("supplementaryDownloads", {});

    if ( !data?.downloads ) return <Loading/>;

    return <ul className={ "govuk-list govuk-body-s" } { ...props }>{
        data.downloads.map((item, ind) =>
            <li className={ "govuk-!-margin-bottom-2" }>
                <span>{ item.label }</span>
                <p className={ "govuk-body-s govuk-!-margin-top-1" }>{
                    item.links.map((link, linkInd) =>
                        <a className={ "govuk-link govuk-link-!-no-visited-state govuk-!-margin-right-3" }
                           href={ link.url }>{ link.text }</a>
                    )
                }</p>
            </li>
        )
    }</ul>

}; // SupplementaryDownloads


const selectAndCopy = (event: any)  => {

    let range = document.createRange();
    range.selectNodeContents(event.target);

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");

};  // selectContent


const Download: ComponentType<*> = () => {

    const
        { timestamp } = useTimestamp(),
        today = moment(timestamp).format("YYYY-MM-DD");

    const [areaType, setAreaType] = useState("overview");
    const [areaCode, setAreaCode] = useState(null);
    const [metric, setMetric] = useState([]);
    const [dataReleaseDate, setDataReleaseDate] = useState("latest");
    const [format, setFormat] = useState("csv");
    const [archiveDate, setArchiveDate] = useState(today);
    const [urlParams, setUrlParams] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {

        setUrlParams(formatUrl({
            areaType, areaCode, metric, format,
            release: dataReleaseDate !== "latest" && archiveDate
        }));

        setIsEnabled(areaType && metric?.length && metric.length <= MAX_METRICS && archiveDate && format);

    }, [areaType, areaCode, metric, archiveDate, format, dataReleaseDate ])

    return <>
        <div className="govuk-phase-banner status-banner govuk-!-margin-bottom-0">
            <p className="govuk-phase-banner__content">
                <strong className="govuk-tag govuk-phase-banner__content__tag">
                    EXPERIMENTAL
                </strong>
                <span className="govuk-phase-banner__text">
                    This is a new addition to the service. It is subject to active development
                    and may become unstable or unresponsive without prior notice.
                </span>
            </p>
        </div>
        <Container>
            <MainContent className={ "no-border" }>
                <p className="govuk-body govuk-!-margin-top-1">
                    You may download the data by clicking on the "Download data" button,
                    or using the permanent link. Download requests are subject
                    to the <a className={ "govuk-link govuk-link--no-visited-state" }
                              href={ "#fair-usage-policy" }>Fair usage policy</a>.
                </p>
                <p className="govuk-body govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                    You must select an area type and at least one metric to enable the
                    "Download data" button and create a link. You may further choose a
                    specific area name to reduce the data to a specific location.
                </p>
            <div id={ "downloadData" } className={ "govuk-!-margin-top-3" }>
                <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>

                    <AreaTypeSelector areaType={ areaType } setAreaType={ setAreaType }/>
                    <AreaNameSelector areaType={ areaType } areaCode={ areaCode } setAreaCode={ setAreaCode }/>
                    <MetricMultiSelector metrics={ metric } setMetrics={ setMetric }/>

                    <FormItem aria-labelledby={ "aria-releasedate-label" }
                              aria-described-by={ "aria-releasedate-descr" }
                              width={ "two-third" }>
                        <span
                            id={ "releasedate-label" }
                            className={ "govuk-label govuk-label--s" }>
                            Data release date
                        </span>
                        <p className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1" }
                           id={ "dataformat-descr" }>
                            Required. Note that when the "Latest" option is selected,
                            the permanent link will always produce the data as they appear on
                            the website &mdash; that is, the very latest release.
                        </p>
                        <div aria-labelledby={ "releasedate-label" }
                            aria-describedby={ 'releasedate-descr' }>
                            <Radio heading="Data Release Date"
                                   value={ dataReleaseDate }
                                   options={ dataReleaseDateOptions }
                                   setValue={ setDataReleaseDate }
                                   inline={ false }/>
                        </div>
                        <ArchiveDatePicker display={ dataReleaseDate === "archive" }
                                           minDate={ MIN_ARCHIVE_DATE }
                                           setDate={ setArchiveDate }
                                           date={ archiveDate }/>
                    </FormItem>

                    <FormItem>
                        <span
                            id={ "dataformat-label" }
                            className={ "govuk-label govuk-label--s" }>
                            Data Format
                        </span>
                        <p className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1" }
                           id={ "dataformat-descr" }>
                            Required. The format of the document.
                        </p>
                        <div aria-labelledby={ "dataformat-label" }
                             aria-describedby={ 'dataformat-description' }>
                            <Radio
                                heading="Data Format"
                                value={format}
                                options={dataFormatOptions}
                                setValue={(item) => setFormat(item)}
                                inline={false}
                            />
                        </div>
                    </FormItem>
                    <FormItem width={ "full" }>
                        <span id={ "downloadlink-label" } className={ "govuk-label govuk-label--s" }>
                            Permanent link
                        </span>
                        <p className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1" }
                           id={ "downloadlink-descr" }>
                            This is the permanent link for your specific request. Click
                            on the box to copy the link into clipboard.
                        </p>
                        <PermaLink onClick={ isEnabled && selectAndCopy }
                                   aria-labelledby={ "downloadlink-label" }
                                   aria-describedby={ 'downloadlink-descr' }>
                            {
                                isEnabled
                                    ? URLs.downloadData + urlParams
                                    : "You must select at least one metric to generate a link."
                            }
                        </PermaLink>
                    </FormItem>
                    <FormItem>
                        <p className="govuk-hint govuk-!-font-size-16">
                            The records in the document will not be ordered.
                        </p>
                        {
                            isEnabled
                                ? <DownloadLink className={ "govuk-button" }
                                                  target={ "_blank" }
                                                  href={ URLs.downloadData + urlParams }
                                                  enabled={ isEnabled }
                                                  download>
                                    Download data
                                </DownloadLink>
                                : <button className={ "govuk-button" } disabled={ true }>
                                    Download data
                                </button>
                        }
                    </FormItem>
                </Form>
            </div>

            <h2 id={ "fair-usage-policy" } className={ "govuk-heading-s govuk-!-margin-top-4" }>
                Fair usage policy
            </h2>
            <p className="govuk-body-s govuk-!-margin-bottom-2">
                Due to the large volume of data that may be downloaded through this
                page, a fair usage policy applies:
            </p>
            <ul className="govuk-list govuk-body-s govuk-!-margin-bottom-2">
                <li>
                    <strong>Throttling:</strong> Each user is limited to 10 download
                    requests per any 100&ndash;second period, with a maximum rate
                    limit of 100 per hour.
                </li>
                <li className={ "govuk-!-margin-top-2" }>
                    <strong>Metric limit:</strong> Each download request may contain
                    up to a maximum number of 5 metrics. This excludes the default
                    metrics.
                </li>
                <li className={ "govuk-!-margin-top-2" }>
                    <strong>Freshness:</strong> Identical requests are only refreshed
                    once every 150 seconds.
                </li>
            </ul>
            <p className="govuk-body-s govuk-!-margin-bottom-2">
                The limits outlined in this policy are subject to change without prior
                notice.
            </p>
        </MainContent>
        <SideContent>
            <h2 className={ "govuk-heading-s govuk-!-margin-top-3 govuk-!-margin-bottom-3" }>
                Supplementary downloads
            </h2>
            <div className={ "govuk-body-xs" }>
                <SupplementaryDownloads/>
            </div>
        </SideContent>
    </Container>
    </>
} // Download


export default Download;
