// @flow

import React, { useState, useEffect } from 'react';
import useGenericAPI from "hooks/useGenericAPI";

import Select from "react-select";

import { Formset, SelectOptions } from "./Download.styles";
import type { ComponentType } from "react";


export const FormItem: ComponentType<*> = ({ children, width="one-half", className="", ...props }) => {

    return <Formset className={ `${className} ${width}` } { ...props }>
        { children }
    </Formset>

};  // FormItem


const Selector: ComponentType<*> = ({ data, areaType, areaCode, setAreaCode, enabled=true }) => {

    const [ options, setOptions ] = useState([]);

    console.log(data)
    useEffect(() => {

        setOptions(
            Object
                .keys(data?.[areaType] ?? {})
                .filter(item => item !== areaType)
                .map(key => ({ value: key, label: data[areaType][key].name }))
        );

    }, [data]);

    return <FormItem width={ "one-half" }>
        <span id={ "region-label" } className={ "govuk-label govuk-label--s" }>{
            areaType !== "region"
            ? areaType !== "la"
            ? "MSOA"
            : "Local Authority"
            : "Region"
        }</span>

        <div aria-labelledby={ "region-label" } aria-describedby={ 'region-descr' }>
            <Select options={ options }
                    styles={ SelectOptions }
                    value={ options.filter(item => item.value === areaCode) }
                    onChange={ ({ value }) => setAreaCode(value)  }
                    isLoading={ enabled && options.length < 1 }
                    placeholder={ "Select region" }
                    isDisabled={ !areaType || !enabled }
                    className={ 'select' }/>
        </div>
    </FormItem>

};  // Selector


const MsoaSelectContainer: ComponentType<*> = ({ setAreaCode }) => {

    const data = useGenericAPI("msoaData");
    const [ regionCode, setRegionCode ] = useState(null);
    const [ localAuthorityCode, setLocalAuthorityCode ] = useState(null);
    const [ msoaCode, setMsoaCode ] = useState(null);

    useEffect(() => {

        setAreaCode(msoaCode || localAuthorityCode || regionCode);

    }, [ regionCode, localAuthorityCode, msoaCode ]);

    return <>
        <Selector data={ data }
                  areaType={ "region" }
                  areaCode={ regionCode }
                  setAreaCode={ setRegionCode }/>
        <Selector data={ data?.["region"]?.[regionCode] ?? [] }
                  areaType={ "la" }
                  areaCode={ localAuthorityCode }
                  enabled={ regionCode !== null }
                  setAreaCode={ setLocalAuthorityCode }/>
        <Selector data={ data?.["region"]?.[regionCode]?.["la"]?.[localAuthorityCode] ?? [] }
                  areaType={ "msoa" }
                  areaCode={ msoaCode }
                  enabled={ localAuthorityCode !== null }
                  setAreaCode={ setMsoaCode }/>
    </>

}; // MsoaSelectContainer


export default MsoaSelectContainer;
