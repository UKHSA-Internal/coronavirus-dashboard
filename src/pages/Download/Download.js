// @flow

import React, { Component, useState, useEffect } from 'react';
import Select from "react-select"; 

import axios from "axios";

import URLs from "common/urls";

import { DownloadProps, DownloadState } from './Download.types';
import {
    Loading,
    Markdown,
    Article
} from './Download.styles';
import { Radios } from 'govuk-react-jsx/govuk/components/radios';
import { Radio } from 'components/GovUk';

const dataFormatOptions = {   
    choices: [
        { label: "CSV", value: "csv" },
        { label: "JSON", value: "json"},
        { label: "XML", value: "xml"},
        { label: "JSONL", value: "jsonl"}     
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
        const [metrics, setMetrics] = useState([]);
        const [dataReleaseDate, setDataReleaseDate] = useState(null); // set to today as default
        const [dataFormat, setDataFormat] = useState('CSV'); // use array

        const handleAreaTypeChange = (item) => {
            setAreaType({ areaType: item.value });
            setAreaNames([]);
            setMetrics([]);
        }

        const handleAreaNameChange = (item) => {
            setMetrics([]);
        }

        const handleMetricChange = (item) => {
        }

        const getDropDownData = () => {
            setAreaType([]);
            setAreaNames([]);
            setMetrics([]);
        }

        useEffect(() => {
            setLoading(false);
            getDropDownData();
        }, []);

        if ( loading ) return <Loading>Loading&hellip;</Loading>

        return (
                <div>
                
                    <div aria-labelledby={ "aria-type-label" }
                        aria-describedby={ 'aria-type-description' }>
                        <Select options={[]}
                                value={areaType}
                                onChange={handleAreaTypeChange}
                                styles={ SelectOptions }
                                isLoading={false}
                                placeholder={ "Select area type" }
                                className={ 'select' }/>
                    </div>

                    <div aria-labelledby={ "aria-type-label" }
                        aria-describedby={ 'aria-type-description' }>
                        <Select options={[]}
                                value={areaNames}
                                onChange={handleAreaNameChange}
                                styles={ SelectOptions }
                                isLoading={false}
                                placeholder={ "Select area(s)" }
                                className={ 'select' }
                                isMulti/>
                    </div>

                    <div aria-labelledby={ "aria-type-label" }
                        aria-describedby={ 'aria-type-description' }>
                        <Select options={[]}
                                value={metrics}
                                onChange={handleMetricChange}
                                styles={ SelectOptions }
                                isLoading={false}
                                placeholder={ "Select Metrics" }
                                className={ 'select' }
                                isMulti/>
                    </div>

                    <div aria-labelledby={ "aria-type-label" }
                        aria-describedby={ 'aria-type-description' }>
                              <Radio
                                  heading={"Data Format"}
                                  value={dataFormat}
                                  options={dataFormatOptions}
                                  setValue={setDataFormat}
                              />
                     </div>        



               </div>
        ) // return



} // Download


export default Download;
