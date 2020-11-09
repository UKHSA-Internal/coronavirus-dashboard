// @flow

import React, { Component, useState, useEffect } from 'react';
import Select from "react-select"; 

import axios from "axios";

import DayPickerInput from "react-day-picker/DayPickerInput";

import {AreaTypes} from "../../components/DashboardHeader/Constants";

import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";

import URLs from "common/urls";

import { DownloadProps, DownloadState } from './Download.types';
import {
    Loading,
    Markdown,
    Article
} from './Download.styles';
import { Radios } from 'govuk-react-jsx/govuk/components/radios';
import { Radio } from 'components/GovUk';


const DOWNLOAD_LINK = "http://localhost:3000";

const AreaNames = [
    { value: "England", label: "England" },
    { value: "Northern Ireland", label: "Northern Ireland" },
    { value: "Scotland", label: "Scotland" },
    { value: "Wales", label: "Wales" },
]

const MAX_METRICS = 5;

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

const Download: ComponentType<Props> = ({}: Props) => {

        
        const [loading, setLoading] = useState(true);
        const [areaType, setAreaType] = useState('');
        const [areaNames, setAreaNames] = useState([]);
        const [areaNameOptions, setAreaNameOptions] = useState([]);
        const [metricOptions, setMetricOptions] = useState([]);
        const [metrics, setMetrics] = useState([]);
        const [dataReleaseDate, setDataReleaseDate] = useState('today');
        const [dataFormat, setDataFormat] = useState('json');
        const [throttleMesage, setThrottleMessage] = useState(false);
        const [downloadButton, setDownloadButton] = useState(false);
        const [archiveDate, setArchiveDate] = useState(null);
        const [archivedDateDisabled, setArchivedDateDisabled] = useState(false);

        const handleAreaTypeChange = (item) => {
            setAreaType(item);
            setAreaNames([]);
        };

        const handleAreaNameChange = (item) => {
            setAreaNames(item);
        };

        const handleMetricChange = (item) => {
            if(metrics.length <= MAX_METRICS) {
                setMetrics(item);
            }
        };

        const handleDataReleaseDate = (item) => {
            setDataReleaseDate(item);
            setArchiveDate(null)
        }

        const handleArchiveDateChange = (archiveDate) => {
            setArchiveDate(archiveDate);
        };

        const handletDataFormatChange = (format) => {
            setDataFormat(format);
        };

        const getDropDownData = () => {
            const metricsURL = URLs.metrics;
            const getMetricsData = async () => {
                const { data } = await axios.get(metricsURL);
                let m = [];
                for (var key of Object.keys(data)) {
                    m.push({"value": key, "label": key});
                }
                setMetricOptions(m);
            }
    
            getMetricsData();
            setAreaNameOptions(AreaNames);
        };

        const showThrottleMessage = () => {
            setThrottleMessage(true);
        };

        const cancelThrottleMessage = () => {
            setThrottleMessage(false);
        }
        
        const downloadData = () => {
            setDownloadButton(true);
            showThrottleMessage();
            setTimeout(() => { cancelThrottleMessage(); }, 10000);
            setDownloadButton(false);
        }

        const buildDownloadLink = () => {
            const baseUrl = URLs.downloadData;
            let downloadUrl = baseUrl + "areaType=" + areaType.value;
            if (areaNames.length > 0) {
                areaNames.forEach(name => {
                    downloadUrl = downloadUrl + "&areaName=" + name.value;
                });
            };
           
            if (dataReleaseDate === 'archive') {
                alert  (archiveDate)
                downloadUrl = downloadUrl + "&release=" + formatDate(archiveDate, "YYYY-MM-DD");
            }
            else if (dataReleaseDate === 'today') {
                downloadUrl = downloadUrl + "&release=" + formatDate(new Date(), "YYYY-MM-DD");
            };
            metrics.forEach(metric => {
                downloadUrl = downloadUrl + "&metric=" + metric.value;
            });
            if (dataFormat) {
                downloadUrl = downloadUrl + "&format=" + dataFormat;
            }
            else {
                downloadUrl = downloadUrl + "&format=" + "json";
            }
            alert(downloadUrl);
            
        }

        useEffect(() => {
            setLoading(false);
            getDropDownData();
        }, []);

        if ( loading ) return <Loading>Loading&hellip;</Loading>

        return (
                <div id={ "downloadData" } className={ "govuk-!-margin-top-3" } style={ { display: 'block' } }>    

                    {throttleMesage && 
                        <div className="govuk-form-group govuk-!-margin-bottom-0">
                            Throttle Message
                        </div>
                    }

                    <form className={ "govuk-!-padding-left-5 govuk-!-padding-right-5" } >


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
                                    <Select options={AreaTypes}
                                            value={areaType}
                                            onChange={handleAreaTypeChange}
                                            styles={ SelectOptions }
                                            isLoading={false}
                                            placeholder={ "Select area type" }
                                            className={ 'select' }/>
                                </div>
                            </div>
                        </div>

                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-quarter">
                                <span 
                                    id={ "aria-name-label" }
                                    className={ "govuk-label govuk-label--s" }>
                                        Area name
                                </span>
                                <div aria-labelledby={ "aria-name-label" }
                                    aria-describedby={ 'aria-name-description' }>
                                    <Select options={areaNameOptions}
                                            value={areaNames}
                                            onChange={handleAreaNameChange}
                                            styles={ SelectOptions }
                                            isLoading={false}
                                            placeholder={ "Select area(s)" }
                                            className={ 'select' }
                                            isMulti/>
                                </div>
                            </div>
                        </div>


                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-quarter">
                                <span 
                                    id={ "aria-metric-label" }
                                    className={ "govuk-label govuk-label--s" }>
                                        Metrics
                                </span>

                                <div aria-labelledby={ "aria-metric-label" }
                                    aria-describedby={ 'aria-metric-description' }>
                                    <Select options={metricOptions}
                                            value={metrics}
                                            onChange={handleMetricChange}
                                            styles={ SelectOptions }
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
                                        onDayChange={ handleArchiveDateChange }
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
                                            setValue={handletDataFormatChange}
                                            inline={false}
                                        />
                                </div>
                            </div>
                        </div>          


                        <div className="govuk-grid-row govuk-!-margin-top-2">
                            <div className="govuk-grid-column-one-quarter">
                                <button onClick={buildDownloadLink}>Download data</button>
                            </div>
                        </div>

                    </form>

               </div>
        ) // return



} // Download


export default Download;
