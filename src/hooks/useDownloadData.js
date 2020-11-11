// @flow

import { useState, useEffect } from "react";


import URLs from "common/urls";

import axios from "axios";


const AreaNames = [
    { value: "England", label: "England" },
    { value: "Northern Ireland", label: "Northern Ireland" },
    { value: "Scotland", label: "Scotland" },
    { value: "Wales", label: "Wales" },
]

export const disabledDownload = {
    color: 'currentColor',
    cursor: 'not-allowed',
    opacity: '0.5',
    textDecoration: 'none'
};

const useDownloadData  = () => {

    const [loading, setLoading] = useState(true);
    const [areaType, setAreaType] = useState(null);
    const [areaNames, setAreaNames] = useState([]);
    const [areaNameOptions, setAreaNameOptions] = useState([]);
    const [metricOptions, setMetricOptions] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const [dataReleaseDate, setDataReleaseDate] = useState("today");
    const [dataFormat, setDataFormat] = useState(null);
    const [throttleMesage, setThrottleMessage] = useState(false);
    const [archiveDate, setArchiveDate] = useState(null);
    const [archivedDateDisabled, setArchivedDateDisabled] = useState(true); 
    const [isEnabled, setIsEnabled] = useState(disabledDownload);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    const getDropDownData = () => {
        const metricsURL = URLs.metrics;
        const getMetricsData = async () => {
            const { data } = await axios.get("api_variables.json", { baseURL: metricsURL });
            let m = [];
            for (let key of Object.keys(data)) {
                m.push({"value": key, "label": key});
            }
            setMetricOptions(m);
        }

        getMetricsData();
        setAreaNameOptions(AreaNames);
    };

    useEffect(() => {
        setLoading(false);
        getDropDownData();
    }, []);


    const retObject =  {loading, 
                        setLoading,
                        areaType,
                        setAreaType,
                        areaNames, 
                        setAreaNames, 
                        areaNameOptions, 
                        setAreaNameOptions, 
                        metricOptions, 
                        setMetricOptions, 
                        metrics, 
                        setMetrics, 
                        dataReleaseDate, 
                        setDataReleaseDate,
                        dataFormat, 
                        setDataFormat,
                        throttleMesage, 
                        setThrottleMessage,
                        archiveDate, 
                        setArchiveDate,
                        archivedDateDisabled, 
                        setArchivedDateDisabled,
                        isEnabled, 
                        setIsEnabled,
                        isButtonDisabled,
                        setIsButtonDisabled}
        
    return retObject;

};  //useDownloadData


export default useDownloadData;
