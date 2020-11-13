// @flow

import React, { useState, useEffect } from 'react';

import Select from "react-select"; 

import DayPickerInput from "react-day-picker/DayPickerInput";

import {AreaTypeOptions} from "../../components/DashboardHeader/Constants";

import { DownloadLink } from "./Download.styles"

import moment from "moment";

import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";

import URLs from "common/urls";

import { Loading } from './Download.styles';

import { createQuery } from '../../common/utils/utils'

import { Radio } from 'components/GovUk';
import useDownloadData from 'hooks/useDownloadData';
import useTimestamp from 'hooks/useTimestamp';

const MAX_METRICS = 5;
const MIN_ARCHIVE_DATE = Date(2020, 7, 12);

const AreaNames = [
    { value: "England", label: "England" },
    { value: "Northern Ireland", label: "Northern Ireland" },
    { value: "Scotland", label: "Scotland" },
    { value: "Wales", label: "Wales" },
];


const dataFormatOptions = {   
    choices: [
        { label: "CSV", value: "csv" },
        { label: "JSON", value: "json"},
        { label: "XML", value: "xml"},
        { label: "JSONL", value: "jsonl"}     
    ]
};

const dataReleaseDateOptions = {   
    choices: [
        { label: "Today", value: "today" },
        { label: "Archive", value: "archive"} 
    ]
};

const SelectOptions = {
    control: ( base, state ) => ({
        ...base,
        boxShadow: state.isFocused ? "0 0 0 3px #fd0" : "none"
    }),
    menu: provided => ({
        ...provided,
        borderRadius: 0,
        backgroundColor: "rgba(241, 241, 241, 0.95)",
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
    height: "100px",
    minHeight: "100px"
});

const Download: ComponentType<Props> = ({}: Props) => {
       
        const { loading, data } = useDownloadData({defaultResponse: []}),
              metricOptions = data && Object.keys(data).length > 0 ?
                                Object.keys(data).map(key => ({"value": key, "label": key})) : [],
              // TODO retrieve area name options from existing hook
              areaNameOptions = AreaNames;

        const { timestamp } = useTimestamp(),
                archiveDateOptionTo = moment(timestamp).local(true).subtract(1, "days").toDate();
    

        const [areaType, setAreaType] = useState(null);
        const [areaNames, setAreaNames] = useState([]);
        const [metrics, setMetrics] = useState([]);
        const [dataReleaseDate, setDataReleaseDate] = useState("today");
        const [dataFormat, setDataFormat] = useState(null);
        const [archiveDate, setArchiveDate] = useState(null);
        const [archivedDateDisabled, setArchivedDateDisabled] = useState(true); 
        const [isEnabled, setIsEnabled] = useState(false);

        useEffect(() => {
        
            if (areaType && metrics && Object.values(metrics).length > 0) {
                setIsEnabled(true);
            }
            else {
                setIsEnabled(false);
            }

        }, [areaType, metrics]);

        const handleDataReleaseDate = (item) => {
            setDataReleaseDate(item);
            setArchiveDate(null)
            if (item === 'archive') {
                setArchivedDateDisabled(false);
            }
            else {
                setArchivedDateDisabled(true);
            }
        };

        const getParams = (params, label) => {
            if (params && Object.values(params).length > 0) {
    
                return Object.values(params).map(param => (

                    {
                        key: label,
                        sign: '=',
                        value: param.value
                    }

                ))
            } else {
                return "";
            }
        };

        if ( loading ) return <Loading>Loading&hellip;</Loading>

        return (
                <div id={ "downloadData" } className={ "govuk-!-margin-top-3" } style={ { display: 'block' } }>    

                    <form className={ "govuk-!-padding-left-5 govuk-!-padding-right-5" } >

                    
                        <div className="govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                            <div className="govuk-grid-column-two-thirds">
                                <h4 className="govuk-heading-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                                    There is a restriction of 10 download requests per approximately 100 seconds.
                                </h4>
                            </div>
                        </div>
                    
                        <div className="govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                            <div className="govuk-grid-column-two-thirds">
                                <h4 className="govuk-heading-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                                    Use the following fields to download the selected data.
                                    There are some restrictions... ... ...
                                </h4>
                            </div>
                        </div>

                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-quarter">
                                <span 
                                    id={ "aria-type-label" }
                                    className={ "govuk-label govuk-label--s" }>
                                        Area type
                                </span>
                                <div aria-labelledby={ "aria-type-label" }
                                    aria-describedby={ 'aria-type-description' }>
                                    <Select options={AreaTypeOptions}
                                            value={areaType}
                                            onChange={(item) => setAreaType(item)}
                                            styles={ SelectOptions }
                                            isLoading={false}
                                            placeholder={ "Select area type" }
                                            className={ 'select' }/>
                                </div>
                            </div>
                        </div>

                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-half">
                                <span 
                                    id={ "aria-name-label" }
                                    className={ "govuk-label govuk-label--s" }>
                                        Area name
                                </span>
                                <div aria-labelledby={ "aria-name-label" }
                                    aria-describedby={ 'aria-name-description' }>
                                    <Select options={areaNameOptions}
                                            value={areaNames}
                                            onChange={(item) => setAreaNames(item)}
                                            styles={ ExtendedOptionStyles }
                                            isLoading={false}
                                            placeholder={ "Select area(s)" }
                                            className={ 'select' }
                                            isMulti/>
                                </div>
                            </div>
                        </div>


                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-half">
                                <span 
                                    id={ "aria-metric-label" }
                                    className={ "govuk-label govuk-label--s" }>
                                        Metrics
                                </span>

                                <div aria-labelledby={ "aria-metric-label" }
                                    aria-describedby={ 'aria-metric-description' }>
                                    <Select options={metricOptions}
                                            value={metrics}
                                            onChange={(item) => setMetrics(item)}
                                            styles={ ExtendedOptionStyles }
                                            isLoading={false}
                                            placeholder={ "Select Metrics" }
                                            className={ 'select' }
                                            isMulti/>
                                </div>
                            </div>
                        </div>

                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-quarter">
                                <span 
                                    id={ "aria-releasedate-label" }
                                    className={ "govuk-label govuk-label--s" }>
                                    Data release date
                                </span>

                                <div aria-labelledby={ "aria-releasedate-label" }
                                    aria-describedby={ 'aria-releasedate-description' }>
                                        <Radio
                                            heading="Data Release Date"
                                            value={dataReleaseDate}
                                            options={dataReleaseDateOptions}
                                            setValue={handleDataReleaseDate}
                                            inline={false}
                                        />
                                       
                                </div>

                                <div aria-labelledby={ "aria-archivedate-label" }
                                    aria-describedby={ 'aria-archivedate-description' }>
                                    <DayPickerInput
                                        formatDate={ formatDate }
                                        parseDate={ parseDate }
                                        placeholder={ "Select date" }
                                        format={ "DD/MM/YYYY" }
                                        inputProps={{ disabled: archivedDateDisabled }}
                                        onDayChange={ (item) => setArchiveDate(item) }
                                        dayPickerProps={ {
                                            locale: 'en-gb',
                                            localeUtils: MomentLocaleUtils,
                                            disabledDays: [{
                                                before: {MIN_ARCHIVE_DATE},
                                                after: new Date(archiveDateOptionTo.getFullYear(), 
                                                                archiveDateOptionTo.getMonth(),
                                                                archiveDateOptionTo.getDate())
                                        }]
                                        }}/>    
                                </div>
                            </div>
                        </div>

                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-quarter">
                                <span 
                                    id={ "aria-dataformat-label" }
                                    className={ "govuk-label govuk-label--s" }>
                                    Data Format
                                </span>

                                <div aria-labelledby={ "aria-dataformat-label" }
                                    aria-describedby={ 'aria-dataformat-description' }>
                                        <Radio
                                            heading="Data Format"
                                            value={dataFormat}
                                            options={dataFormatOptions}
                                            setValue={(item) => setDataFormat(item)}
                                            inline={false}
                                        />
                                </div>
                            </div>
                        </div>          


                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-quarter">
                                <DownloadLink
                                    enabled={isEnabled}
                                    href={URLs.downloadData + createQuery([
                                            {
                                                key: 'areaType',
                                                sign: '=',
                                                value: areaType && areaType. value ?
                                                     areaType.value.toLowerCase().replace(/nhsNation/i, "nation") : ""
                                            },
                                            ...getParams(areaNames, "areaName"),
                                            ...getParams(metrics, "metric"),
                                            {
                                                key: 'release',
                                                sign: '=',
                                                value: dataReleaseDate == 'today' ? formatDate(new Date(), "YYYY-MM-DD") : 
                                                       dataReleaseDate == 'archive' ? formatDate(archiveDate, "YYYY-MM-DD") :
                                                       ""
                                            },
                                            {
                                                key: 'format',
                                                sign: '=',
                                                value: dataFormat ? dataFormat : "json"
                                            }
                                        ], "&", "?", false)}>
                                        Download data           
                                </DownloadLink>
                            </div>
                        </div>

                    </form>

               </div>
        ) // return



} // Download


export default Download;
