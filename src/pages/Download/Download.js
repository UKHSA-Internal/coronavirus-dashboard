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

const DataFormatOptions = [

]


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


        useEffect(() => {
            setLoading(false);
        }, []);

        if ( loading ) return <Loading>Loading&hellip;</Loading>

        return (
                <div>
                
                    <div aria-labelledby={ "aria-type-label" }
                        aria-describedby={ 'aria-type-description' }>
                        <Select options={[]}
                                value={areaType}
                                onChange={ item => setAreaType({ areaType: item.value }) }
                                styles={ SelectOptions }
                                isLoading={false}
                                placeholder={ "Select area type" }
                                className={ 'select' }/>
                    </div>

                    <div aria-labelledby={ "aria-type-label" }
                        aria-describedby={ 'aria-type-description' }>
                        <Select options={[]}
                                value={areaNames}
                                //onChange={ item => setAreaNames({ areaType: item.value }) }
                                styles={ SelectOptions }
                                isLoading={false}
                                placeholder={ "Select area(s)" }
                                className={ 'select' }/>
                    </div>

                    <div aria-labelledby={ "aria-type-label" }
                        aria-describedby={ 'aria-type-description' }>
                        <Select options={[]}
                                value={metrics}
                                //onChange={ item => setMetrics({ areaType: item.value }) }
                                styles={ SelectOptions }
                                isLoading={false}
                                placeholder={ "Select Metrics" }
                                className={ 'select' }/>
                    </div>


               </div>
        ) // return



} // Download


export default Download;
