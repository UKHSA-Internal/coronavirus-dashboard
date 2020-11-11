// @flow

import React, { useState, useEffect } from 'react';

import Select from "react-select"; 

import DayPickerInput from "react-day-picker/DayPickerInput";

import {AreaTypeOptions} from "../../components/DashboardHeader/Constants";

import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";

import URLs from "common/urls";

import { Loading } from './Download.styles';

import { Radio } from 'components/GovUk';
import useDownloadData from 'hooks/useDownloadData';

const MAX_METRICS = 5;

const AreaNames = [
    { value: "England", label: "England" },
    { value: "Northern Ireland", label: "Northern Ireland" },
    { value: "Scotland", label: "Scotland" },
    { value: "Wales", label: "Wales" },
]

const disabledDownload = {
    color: 'currentColor',
    cursor: 'not-allowed',
    opacity: '0.5',
    textDecoration: 'none'
};

const enabledDownload = {
    color: 'currentColor'
};

const dataFormatOptions = {   
    choices: [
        { label: "CSV", value: "csv" },
        { label: "JSON", value: "json"},
        { label: "XML", value: "xml"},
        { label: "JSONL", value: "jsonl"}     
    ]
}

const dataReleaseDateOptions = {   
    choices: [
        { label: "Today", value: "today" },
        { label: "Archive", value: "archive"} 
    ]
}

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
              metricOptions = Object.keys(data).map(key => ({"value": key, "label": key})),
              // TODO retrieve area name options from existing hook
              areaNameOptions = AreaNames;

        const [areaType, setAreaType] = useState(null);
        const [areaNames, setAreaNames] = useState([]);
        const [metrics, setMetrics] = useState([]);
        const [dataReleaseDate, setDataReleaseDate] = useState("today");
        const [dataFormat, setDataFormat] = useState(null);
        const [throttleMesage, setThrottleMessage] = useState(false);
        const [archiveDate, setArchiveDate] = useState(null);
        const [archivedDateDisabled, setArchivedDateDisabled] = useState(true); 
        const [isEnabled, setIsEnabled] = useState(disabledDownload);

        useEffect(() => {
        
            if (areaType && metrics && Object.values(metrics).length > 0) {
                setIsEnabled(enabledDownload);
            }
            else {
                setIsEnabled(disabledDownload);
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
        }
    
        const showTrottleMessage = () => {
            const href  = URLs.downloadData + 
                "?areaType=" + (areaType && areaType.value ? areaType.value : "") +
              (areaNames && Object.values(areaNames).length > 0 ?
                areaNames.map(areaName => "&areaName=" + areaName.value) : ""
              ) +
              (metrics && Object.values(metrics).length > 0 ?
                metrics.slice(0, MAX_METRICS).map(metric => "&metric=" + metric.value) : ""
              ) +
              (dataReleaseDate == 'today' ? "&release=" + formatDate(new Date(), "YYYY-MM-DD") : 
               dataReleaseDate == 'archive' ? "&release=" + formatDate(archiveDate, "YYYY-MM-DD") : "") +
              (dataFormat ? "&format=" + dataFormat : "json");

            window.open(href)
            setThrottleMessage(true);
            setTimeout(() => { setThrottleMessage(false); }, 20000);
        };


        if ( loading ) return <Loading>Loading&hellip;</Loading>

        return (
                <div id={ "downloadData" } className={ "govuk-!-margin-top-3" } style={ { display: 'block' } }>    

                    <form className={ "govuk-!-padding-left-5 govuk-!-padding-right-5" } >

                        {throttleMesage && 
                            <div className="govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                                <div className="govuk-grid-column-two-thirds">
                                    <h4 className="govuk-heading-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                                        There is a restriction of 10 download requests per approximately 100 seconds.
                                    </h4>
                                </div>
                            </div>
                        }


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
                                                before: new Date(2020, 7, 12),
                                                after: new Date()
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
                                <a  style={isEnabled}
                                    className={ "govuk-link" }
                                    href="#"
                                    onClick={showTrottleMessage}>
                                        Download data           
                                </a>
                            </div>
                        </div>

                    </form>

               </div>
        ) // return



} // Download


export default Download;
