// @flow

import React, { useState, useEffect } from 'react';
import useGenericAPI from "hooks/useGenericAPI";

import Select from "react-select";
import FormItem from "components/Formset";

import { SelectOptions } from "./Download.styles";
import type { ComponentType } from "react";


const getLabel = ( areaType: string ) => {

    switch ( areaType ) {
        case "region":
            return {
                singular: "Region",
                plural: "Regions"
            };

        case "la":
            return {
                singular: "Local Authority",
                plural: "Local Authorities"
            };

        case "msoa":
            return {
                singular: "MSOA",
                plural: "MSOAs"
            };

        default:
            throw Error(`Invalid area type "${ areaType }".`);
    }

};  // getRegionName


const Description: ComponentType<*> = ({ areaType, parentName, enabled }) => {

    return <p className={ "govuk-hint govuk-!-font-size-16 govuk-!-margin-top-1" }
              id={ `msoa-descr-${ areaType }` }>
        Optional. Leave blank to download all MSOAs
        records{ parentName ? ` in ${ parentName }` : "" }.
        {
            enabled
                ? <span className={ "govuk-visually-hidden" }>
                    Currently disabled. Select the preceding option to enable.
                </span>
                : null
        }
    </p>

};  // Description


const Selector: ComponentType<*> = ({ data, areaType, areaCode, setAreaCode, enabled=true, parentName }) => {

    const [ options, setOptions ] = useState([]);
    const label = getLabel(areaType);

    useEffect(() => {

        setOptions(
            Object
                .keys(data?.[areaType] ?? {})
                .filter(item => item !== areaType)
                .map(key => ({ value: key, label: data[areaType][key].name }))
        );

    }, [data]);

    return <FormItem width={ "one-half" }>
        <span id={ `msoa-label-${ areaType }` }
              className={ "govuk-label govuk-label--s" }>{ label.singular }</span>

        <Description parentName={ parentName }
                     areaType={ areaType }
                     enabled={ areaType || enabled }/>

        <div aria-labelledby={ `msoa-label-${ areaType }` }
             aria-describedby={ `msoa-descr-${ areaType }` }>
            <Select options={ options }
                    styles={ SelectOptions }
                    value={ options.filter(item => item?.value === areaCode) }
                    onChange={ item => setAreaCode(item?.value ?? null)  }
                    isLoading={ enabled && options.length < 1 }
                    placeholder={ `Select ${label.singular}` }
                    isDisabled={ !areaType || !enabled }
                    className={ 'select' }
                    isClearable/>
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
                  parentName={ "England" }
                  setAreaCode={ setRegionCode }/>
        <Selector data={ data?.["region"]?.[regionCode] ?? [] }
                  areaType={ "la" }
                  areaCode={ localAuthorityCode }
                  enabled={ regionCode !== null }
                  parentName={ data?.["region"]?.[regionCode]?.name }
                  setAreaCode={ setLocalAuthorityCode }/>
        <Selector data={ data?.["region"]?.[regionCode]?.["la"]?.[localAuthorityCode] ?? [] }
                  areaType={ "msoa" }
                  areaCode={ msoaCode }
                  enabled={ localAuthorityCode !== null }
                  parentName={ data?.["region"]?.[regionCode]?.["la"]?.[localAuthorityCode]?.name }
                  setAreaCode={ setMsoaCode }/>
    </>

}; // MsoaSelectContainer


export default MsoaSelectContainer;
