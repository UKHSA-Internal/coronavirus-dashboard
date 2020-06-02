// @flow
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";

import axios from "axios";

import URLs from "common/urls";
import { createQuery, getParams } from "common/utils";

import { Select } from "./DashboardHeader.styles";

import { getParamValueFor } from "./utils";

import type {
    FlatHierarchyItem,
    HierarchyDataType,
    LookupDataType,
    LocationPickerProps
} from "./DashboardHeader.types";



const GetLookup = (): LookupDataType | null => {

    const [ lookupTable, setLookupTable ] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(
                'lookupTable_bothWay_v1.json',
                { baseURL: URLs.lookups }
                );

            setLookupTable(data)
        }

        getData()

    }, []);

    return lookupTable

};  // GetLookup


const GetDataFor = ( hierarchy: HierarchyDataType, lookup: LookupDataType ) => {

    const
        flatHierarchy: FlatHierarchyItem = Object
            .keys(hierarchy)
            .reduce((acc, item) =>
                [...acc, ...hierarchy[item].map(value => ({...value, type: item}))],
                []
            );

    // Closure definition:
    //--------------------
    // itemName is the parentName for getting children and the childName for getting
    // the parent - Default behaviour is to get the children.
    return (areaType: string, itemName: string | null, getParent: boolean = false): Array<string> | string => {

        if (!lookup || !hierarchy) return getParent ? "" : [];

        // Getting the children
        if ( !getParent ) {

            if ( !itemName ) return hierarchy[areaType];

            for ( const { name, code, type } of flatHierarchy ) {
                if ( name !== itemName ) continue;

                return hierarchy[areaType].filter(item =>
                    lookup[type][code].c.indexOf(item.code) > -1
                )
            }

            // default children
            return []

        }

        // Getting the parent
        for ( const { name, code, type } of flatHierarchy ) {

            if ( name !== itemName || areaType !== type ) continue;

            for ( const item of flatHierarchy )
                if ( item.code === lookup[type][code].p ) return item.name

        }

        // default parent
        return ""

    }

};  // GetDataFor


const usePrevious = (value, getData) => {

    const ref = useRef([
        // These must be ordered.
        { areaType: "nation", areaName: null, options: getData("nation", null) },
        { areaType: "region", areaName: null, options: getData("region", null) },
        { areaType: "utla",   areaName: null, options: getData("utla", null)   },
        { areaType: "ltla",   areaName: null, options: getData('ltla', null)   },
    ]);

    useEffect(() => {

        ref.current = value

    })

    return ref.current

};  // usePrevious


const LocationPicker = ({ hierarchy, query }: LocationPickerProps) => {

    const
        order = {
            "nation": {
                key: "nation",
                label: "nations",
                parent: null
            },
            "region": {
                key: "region",
                label: "regions",
                parent: "nation",
            },
            "utla": {
                key: "utla",
                label: "upper-trier local authorities",
                parent: "region",
            },
            "ltla": {
                key: "ltla",
                label: "lower-tier local authorities",
                parent: "utla"
            }
        },
        lookup = GetLookup(),
        getData = GetDataFor(hierarchy, lookup),
        history = useHistory(),
        initialParam = getParams(query),
        [ location, setLocation ] = useState([]),
        previousLocation = usePrevious(location, getData);


    useEffect(() => {
        getStateFor(
            getParamValueFor(initialParam, "areaName"),
            order?.[getParamValueFor(initialParam, "areaType")] ?? null,
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ lookup, hierarchy ]);


    const getStateFor = (value, areaTypeItem) => {

        let
            prevState = previousLocation,
            newLocation = [],
            orderKeys = Object.keys(order),
            tempLoc;

        // Forward propagation of children
        for ( let index = 0; index < prevState.length; index++ ) {

            tempLoc = (prevState[index].areaType === areaTypeItem?.key ?? null)
                ? {
                    areaType: areaTypeItem.key,
                    areaName: value,
                    options: getData(areaTypeItem.key, null)
                }
                : {
                    ...prevState[index],
                    areaName: null,
                    options: getData(order[orderKeys[index]].key, tempLoc?.areaName ?? null)
                };

            newLocation.push(tempLoc)
        }

        // Backward propagation of parents
        const indOfMain = Object.keys(order).indexOf(areaTypeItem?.key ?? null);

        for ( let index = indOfMain; index > 0; index -- ) {

            if ( !(newLocation[index]?.areaName ?? null) ) continue;

            newLocation[index - 1].areaName = getData(
                newLocation[index].areaType,
                newLocation[index].areaName,
                true
            );

        }

        setLocation(newLocation)

    };

    const handleSubmission = (event) => {

        event.preventDefault();

        const selection = [...location]
            .reverse()
            .filter(({ areaName }) => areaName)[0];

        const newQuery = createQuery([
            ...getParams(query),
            ...(
                ( selection?.areaName ?? null )
                    ? [
                        { key: 'areaType', sign: '=', value: selection.areaType },
                        { key: 'areaName', sign: '=', value: selection.areaName }
                    ]
                    : []
            )
        ]);

        history.push(`${ newQuery }`)

    };  // handleSubmission


    return <Fragment>
        <form className={ "govuk-!-padding-left-5 govuk-!-padding-right-5" } onSubmit={ handleSubmission }>
            <div className={ "govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2" }>
                <div className={ "govuk-grid-column-two-thirds" }>
                    <h4 className={ "govuk-heading-s govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                        Select a location to customise data
                    </h4>
                    <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1 govuk-body-s" }>
                        Please note not all data is available for every location.
                    </p>
                </div>
            </div>

            <div className={ "govuk-grid-row " }>{
                location.map(({ areaName, areaType, options }) => {

                    const areaTypeItem = order[areaType]

                    return <Select value={ areaName ? areaName : "" }
                                   disabled={ (options?.length ?? 0) === 0 }
                                   key={ areaType }
                                   onChange={ ({ target: { value } }) => getStateFor(value, areaTypeItem) }
                                   className={ 'govuk-select' }
                                   name={ areaType }>
                        <option value={ "" }>All { areaTypeItem.label }</option>
                        {
                            options && options.map(({ name, code }) =>
                                    <option value={ name }
                                            key={ `${ areaTypeItem.key }-${ code }` }
                                    >
                                        { name }
                                    </option>
                                )
                        }
                    </Select>
                })
            }</div>

            <div className={ "govuk-grid-row govuk-!-margin-top-4 govuk-!-margin-bottom-2" }>
                <div className={ "govuk-grid-column-full" }>
                    <input type={ "submit" }
                           value={ "Update location" }
                           className={ "govuk-button govuk-!-margin-right-1 govuk-!-margin-bottom-0" }/>
                    <input type={ "reset" }
                           value={ "Reset to UK" }
                           onClick={ () => history.push('?') }
                           className={ "govuk-button govuk-button--secondary govuk-!-margin-bottom-0" }/>
                </div>
            </div>

        </form>

        <div className={ "govuk-grid-row govuk-!-margin-top-0" }>
            <div className={ "govuk-grid-column-full" }>
                <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible" }/>
            </div>
        </div>
    </Fragment>

};  // LocationPicker


export default LocationPicker;
