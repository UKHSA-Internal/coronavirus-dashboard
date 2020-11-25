// @flow

import React, { useState, useEffect } from 'react';

import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";

import moment from "moment";
import MomentLocaleUtils, { formatDate, parseDate } from "react-day-picker/moment";

import Loading from "components/Loading";
import { Radio } from 'components/GovUk';

import URLs from "common/urls";
import { createQuery, groupBy, sort } from 'common/utils/utils';
import { AreaTypeOptions, MSOAMetricOptions } from "components/DashboardHeader/Constants";
import useApi from "hooks/useApi";
import useGenericAPI from 'hooks/useGenericAPI';
import useTimestamp from 'hooks/useTimestamp';

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
import type { ComponentType } from "react";


const MAX_METRICS = 5;
const MIN_ARCHIVE_DATE = "2020-08-12";
const DATE_FORMAT = "YYYY-MM-DD";
const MSOA_AREA_TYPE = "msoa";
const MSOA_ADDITIONAL_TEXT = "For MSOA data download Archive date is not selectable.";

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
        { label: "Latest", value: "latest" },
        { label: "Archive", value: "archive" }
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


const FormItem: ComponentType<*> = ({ children, width="one-half", className="", ...props }) => {

    return <Formset className={ `${className} ${width}` } { ...props }>
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

const MsoaSelectContainer = ({areaType, region, setRegion, ltla, setLtla, setMsoa}) => {

    const [ ltlaOptions,  setLtlaOptions ] = useState([]);
    const [ msoaOptions,  setMsoaOptions ] = useState([]);

    const sortOptions = (a, b) => {
        return a["label"].localeCompare(b["label"]);
    };  // sortOptions

    const getRegions = (msoaData) => {
        let options = [];

        Object.entries(msoaData).forEach(([key, value]) => {
            options.push ({value: key, label: value["name"]});
        });
            
        return options.sort(sortOptions);
    }

    const getLtlas = (msoaData, region) => {
        let options = [];

        Object.entries(msoaData).forEach(([key1, value1]) => {
            if (key1 === region) {
                Object.entries(value1["ltla"]).forEach(([key2, value2]) => {
                    options.push({value: key2, label: value2["name"]});
                });
            }      
        });
        
        return options.sort(sortOptions);
    }

    const getMsoas = (msoaData, region, ltla) => {
        let options = [];

        Object.entries(msoaData).forEach(([key1, value1]) => {
            if (key1 === region) {
                Object.entries(value1["ltla"]).forEach(([key2, value2]) => {
                    if (key2 === ltla) {
                        Object.entries(value2["msoa"]).forEach(([key3, value3]) => {
                            options.push({value: key3, label: value3});
                        });
                    }          
                });
            }      
        });

        return options.sort(sortOptions);
    }

    
    const msoaData = useGenericAPI("msoaData", {}),
          regionOptions = getRegions(msoaData);

    useEffect(() => {
        const ltlas = getLtlas(msoaData, region);
        setLtlaOptions(ltlas);   
    }, [ region ]);

    useEffect(() => {
        const msoas = getMsoas(msoaData, region, ltla);
        setMsoaOptions(msoas); 
    }, [ ltla ]);


    return <>
            <RegionSelector
                    areaType={ areaType }
                    regionOptions={ regionOptions }
                    setRegion={ setRegion }/>

            <LtlaSelector region={ region }
                          ltlaOptions={ ltlaOptions }
                          setLtla={ setLtla }/>

            <MsoaSelector region={ region }
                          ltla={ ltla }
                          msoaOptions={ msoaOptions } 
                          setMsoa={ setMsoa }/>
            </>

} // MsoaSelectContainer
                       
const RegionSelector = ({ areaType, regionOptions, setRegion }) => {

    return <FormItem width={ "one-half" }>
        <span id={ "region-label" } className={ "govuk-label govuk-label--s" }>
            Region
        </span>
       
        <div aria-labelledby={ "region-label" } aria-describedby={ 'region-descr' }>
            <Select options={ regionOptions }
                    styles={ SelectOptions }
                    // value={ regionOptions.filter(obj => msoaData.includes(obj.value)) }
                    onChange={ ({value}) => setRegion(value)  }
                    isLoading={ regionOptions.length < 1}
                    placeholder={ "Select region" }
                    isDisabled={ !areaType || areaType === "overview" }
                    className={ 'select' }/>
        </div>
    </FormItem>  
} // RegionSelector

const LtlaSelector = ({ region, ltlaOptions, setLtla }) => {

    return <FormItem width={ "one-half" }>
        <span id={ "ltla-label" } className={ "govuk-label govuk-label--s" }>
           Local Authority
        </span>
       
        <div aria-labelledby={ "ltla-label" } aria-describedby={ 'ltla-descr' }>
            <Select options={ ltlaOptions }
                    styles={ SelectOptions }
                    isLoading={ ltlaOptions.length < 1 && ltlaOptions}
                    placeholder={ "Select local authority" }
                    isDisabled={ !region }
                    onChange={ ({value}) => setLtla(value) }
                    className={ 'select' }/>
        </div>
    </FormItem>  

} // LtlaSelector

const MsoaSelector = ({ region, ltla, msoaOptions, setMsoa }) => {

    return <FormItem width={ "one-half" }>
        <span id={ "msoa-label" } className={ "govuk-label govuk-label--s" }>
            MSOA
        </span>
       
        <div aria-labelledby={ "msoa-label" } aria-describedby={ 'msoa-descr' }>
            <Select options={ msoaOptions }
                    styles={ SelectOptions }
                    isLoading={ msoaOptions.length < 1 && msoaOptions}
                    placeholder={ "Select msoa" }
                    isDisabled={ !ltla}
                    onChange={ ({value}) => setMsoa(value) }
                    className={ 'select' }/>
        </div>
    </FormItem>  
} // MsoaSelector

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


const MetricMultiSelector = ({ areaType, metrics, setMetrics }) => {

    const
        metricData = useGenericAPI("metrics",{}),
        [error, setError] = useState(null),
        metricNames = areaType === MSOA_AREA_TYPE ? MSOAMetricOptions : 
            Object
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

const ArchiveDatePicker = ({ display=true, areaType, date, setDate, minDate, maxDate }) => {

    if ( !display ) return null;

    if (areaType === MSOA_AREA_TYPE) return null

    if ( !maxDate || !date ) return <Loading/>;

    return <DatePickerContainer>
        <div id={ "archive-descr" }>
            <p className="govuk-body-s govuk-!-margin-top-1">
                The archives in our current database include all publications
                since 12 August 2020. The records are provided exactly as they were
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
            Select or type in a date formatted as "{ DATE_FORMAT }"
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
                        format={ DATE_FORMAT }
                        onDayChange={ value => setDate(moment(value).format(DATE_FORMAT)) }
                        value={ date }
                        dayPickerProps={ {
                            locale: 'en-gb',
                            localeUtils: MomentLocaleUtils,
                            disabledDays: [{
                                before: new Date(minDate),
                                after: new Date(maxDate)
                            }]
                        }}
                    />
                </div>
       
    </DatePickerContainer>

};  // ArchiveDatePicker


const SupplementaryDownloads: ComponentType<*> = ({ ...props }) => {

    const data = useGenericAPI("supplementaryDownloads", {});

    if ( !data?.downloads ) return <Loading/>;

    return <ul className={ "govuk-list govuk-body-s" } { ...props }>{
        data.downloads.map((item, ind) =>
            <li className={ "govuk-!-margin-bottom-2" } key={ `dl-item-${ ind }` }>
                <span>{ item.label }</span>
                <p className={ "govuk-body-s govuk-!-margin-top-1" }>{
                    item.links.map((link, linkInd) =>
                        <a key={ `dl-file-${ ind }-${ linkInd }` }
                           className={ "govuk-link govuk-link-!-no-visited-state govuk-!-margin-right-3" }
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
    return null;

};  // selectContent


const Download: ComponentType<*> = () => {

    const timestamp = useTimestamp();
    const [areaType, setAreaType] = useState("overview");
    const [areaCode, setAreaCode] = useState(null);
    const [metric, setMetric] = useState([]);
    const [dataReleaseDate, setDataReleaseDate] = useState("latest");
    const [format, setFormat] = useState("csv");
    const [archiveDate, setArchiveDate] = useState(null);
    const [urlParams, setUrlParams] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [region, setRegion] = useState(null);
    const [ltla, setLtla] = useState(null);
    const [msoa, setMsoa] = useState(null);
    

    useEffect(() => {

        setUrlParams(formatUrl({
            areaType, areaCode, metric, format,
            release: dataReleaseDate !== "latest" && archiveDate,
            region, ltla, msoa
        }));

        setIsEnabled(areaType && metric?.length && metric.length <= MAX_METRICS && archiveDate && format);

    }, [areaType, areaCode, metric, archiveDate, format, dataReleaseDate, region, ltla, msoa ]);

    useEffect(() => {
        setAreaCode(null);
    }, [ areaType === "overview" ]);

    useEffect(() => {
        const latest = moment(timestamp).format(DATE_FORMAT);
        setArchiveDate(latest);
    }, [ timestamp ]);

    return <>
        <div className={ "govuk-phase-banner status-banner govuk-!-margin-bottom-0" }>
            <p className={ "govuk-phase-banner__content" }>
                <strong className={ "govuk-tag govuk-phase-banner__content__tag" }>
                    EXPERIMENTAL
                </strong>
                <span className={ "govuk-phase-banner__text" }>
                    This is a new addition to the service. It is subject to active development
                    and may become unstable or unresponsive without prior notice.
                </span>
            </p>
        </div>
        <Container>
            <MainContent className={ "no-border" }>
                <p className={ "govuk-body govuk-!-margin-top-1" }>
                    You may download the data by clicking on the "Download data" button,
                    or using the permanent link. Download requests are subject
                    to the <a className={ "govuk-link govuk-link--no-visited-state" }
                              href={ "#fair-usage-policy" }>Fair usage policy</a>.
                </p>
                <p className={ "govuk-body govuk-!-margin-top-1 govuk-!-margin-bottom-0" }>
                    You must select an area type and at least one metric to enable the
                    "Download data" button and create a link. You may further choose a
                    specific area name to reduce the data to a specific location.
                </p>
                <div id={ "downloadData" } className={ "govuk-!-margin-top-3" }>
                    <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>

                        <AreaTypeSelector areaType={ areaType }
                                          setAreaType={ setAreaType }/>

                        { areaType === MSOA_AREA_TYPE ? 
                                <MsoaSelectContainer areaType={ areaType }
                                        region={ region }
                                         setRegion={ setRegion}
                                         ltla={ ltla }
                                         setLtla={ setLtla }
                                         setMsoa={ setMsoa } /> :
                                
                                <AreaNameSelector areaType={ areaType }
                                                  areaCode={ areaCode }
                                                  setAreaCode={ setAreaCode }/>
                                
                        }   

                        <MetricMultiSelector areaType={ areaType }
                                             metrics={ metric }
                                             setMetrics={ setMetric }/>

                        <FormItem aria-labelledby={ "aria-releasedate-label" }
                                  aria-describedby={ "aria-releasedate-descr" }
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
                                {
                                    areaType && areaType === MSOA_AREA_TYPE ? " " + MSOA_ADDITIONAL_TEXT : null
                                }
                                
                            </p>
                            <div aria-labelledby={ "releasedate-label" }
                                aria-describedby={ 'releasedate-descr' }>
                                <Radio heading={ "Data Release Date" }
                                       value={ areaType !== MSOA_AREA_TYPE ? dataReleaseDate : 'latest' }
                                       options={ dataReleaseDateOptions }
                                       setValue={ areaType !== MSOA_AREA_TYPE ? setDataReleaseDate : 
                                                    (value) => {}}
                                       inline={ false }/>
                            </div>
                            <ArchiveDatePicker
                                               display={ dataReleaseDate === "archive" }
                                               areaType={ areaType }
                                               minDate={ MIN_ARCHIVE_DATE }
                                               maxDate={ timestamp }
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
                                    heading={ "Data Format" }
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
                            <PermaLink onClick={ isEnabled ? selectAndCopy : undefined }
                                       aria-labelledby={ "downloadlink-label" }
                                       aria-describedby={ 'downloadlink-descr' }>
                                {
                                    isEnabled && areaType !== MSOA_AREA_TYPE
                                        ? URLs.downloadData + urlParams
                                        :
                                    isEnabled ? URLs.downloadMsoaData + urlParams
                                        : "You must select at least one metric to generate a link."
                                }
                            </PermaLink>
                        </FormItem>
                        <FormItem>
                            <p className={ "govuk-hint govuk-!-font-size-16" }>
                                The records in the document will not be ordered.
                            </p>
                            {
                                isEnabled
                                    ? <DownloadLink className={ "govuk-button" }
                                                      target={ "_blank" }
                                                      href={ (areaType && areaType == MSOA_AREA_TYPE ?
                                                             URLs.downloadMsoaData :  URLs.downloadData) + urlParams }
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
                <p className={ "govuk-body-s govuk-!-margin-bottom-2" }>
                    Due to the large volume of data that may be downloaded through this
                    page, a fair usage policy applies:
                </p>
                <ul className={ "govuk-list govuk-body-s govuk-!-margin-bottom-2" }>
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
                <p className={ "govuk-body-s govuk-!-margin-bottom-2" }>
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

}; // Download


export default Download;
