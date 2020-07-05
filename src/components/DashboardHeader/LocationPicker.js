// @flow

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import { analytics, createQuery, getParams, groupBy } from "common/utils";

import useApi from "hooks/useApi";
import { PathNames } from "./Constants";
import Select from "react-select";


const getOrder = ( history ) => {

    const
        defaultOrder = {
            "nation": {
                key: "nation",
                label: "Nations",
                parent: null
            },
            "region": {
                key: "region",
                label: "Regions",
                parent: "nation",
            },
            "la": {
                key: "la",
                label: "Local authorities",
                parent: "region",
            },
            // "utla": {
            //     key: "utla",
            //     label: "Upper tier local authorities",
            //     parent: "region",
            // },
            // "ltla": {
            //     key: "ltla",
            //     label: "Lower-tier local authorities",
            //     parent: "utla"
            // }
        };


    switch (history.location.pathname.toLowerCase()) {

        case PathNames.testing:
            return {
                "nation": {
                    key: "nation",
                    label: "Nations",
                    parent: null
                }
            };

        case PathNames.healthcare:
            return {
                "nhsNation": {
                    key: "nhsNation",
                    label: "Nations",
                    parent: null
                },
                "nhsRegion": {
                    key: "nhsRegion",
                    label: "NHS regions",
                    parent: "nhsNation",
                }
            };

        case PathNames.deaths:
        case PathNames.cases:
        default:
            return defaultOrder;

    }  // switch

};  // getOrder


const getDefaultOutput = ( pathname ) => {

    switch (pathname.toLowerCase()) {

        case PathNames.testing:
            return [
                // These must be ordered.
                "nation"
            ];

        case PathNames.healthcare:
            return [
                // These must be ordered.
                "nhsNation",
                "nhsRegion"
            ];

        case PathNames.deaths:
            return [
                // These must be ordered.
                "nation",
                "region"
            ]

        case PathNames.cases:
        default:
            return [
                // These must be ordered.
                "nation",
                "region",
                "la"
                // "utla",
                // "ltla"
            ]

    } // switch

};  // getDefaultOutput


const usePrevious = (value) => {

    const ref = useRef(value);

    useEffect(() => {

        ref.current = value

    })

    return ref.current

};  // usePrevious


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
    })
};


const LocationPicker = ({ show, setCurrentLocation, currentLocation }) => {

    const
        history = useHistory(),
        order = getOrder(history),
        pathname = history.location.pathname,
        query = history.location.search,
        newQuery = createQuery([
                ...getParams(query),
                    {
                        key: 'areaType',
                        sign: '=',
                        value: currentLocation.areaType
                            .toLowerCase()
                            .replace(/nhsNation/i, "nation")
                    },
                    { key: 'areaName', sign: '=', value: currentLocation.areaName }
                ]),
        prevQuery = usePrevious(newQuery),
        [areaNameData, setAreaNameData] = useState({ grouped: {}, data: [] }),
        data = useApi({
             disjunctiveFilters:
                 ( currentLocation.areaType ) !== "overview"
                     ? currentLocation.areaType === "la"
                     ? [
                         { key: "areaType", sign: '=', value: 'utla' },
                         { key: "areaType", sign: '=', value: 'ltla' },
                     ]
                     : [{ key: "areaType", sign: '=', value: currentLocation.areaType }] // must be conjunctive
                     : [
                         ...getDefaultOutput(pathname)
                             .filter(item => item !== "la")
                             .map(item => ({key: "areaType", sign: '=', value: item })),
                         ...getDefaultOutput(pathname).indexOf("la") > -1
                             ? [
                                 { key: "areaType", sign: '=', value: 'utla' },
                                 { key: "areaType", sign: '=', value: 'ltla' }
                             ]
                             : []
                     ],
             structure: {
                 value: "areaName",
                 areaType: "areaType"
             },
             endpoint: "lookupApi",
             defaultResponse: []
        });


    useEffect(() => {

        setCurrentLocation(currentLocation);

    }, [ currentLocation.areaType, currentLocation.areaName ]);


    useEffect(() => {

        if ( currentLocation.areaName && prevQuery !== newQuery )
            history.push({ pathname: pathname, search: newQuery });

    }, [ currentLocation.areaName, query, prevQuery, pathname ]);


    useEffect(() => {
        const
            groupedAreaNameData = groupBy(data || [], item => item.value),
            areaNameDataPrepped = Object.keys(groupedAreaNameData)
                .map(value => ({
                    value: value,
                    label: value,
                    areaType: groupedAreaNameData[value].areaType
                }));

        setAreaNameData({ grouped: groupedAreaNameData, data: areaNameDataPrepped })

    }, [ data ]);


    if ( !show ) return null;


    const areaTypeData = getDefaultOutput(pathname).map(item => ({
        value: item,
        label: order?.[item]?.label ?? ""
    }));


    return <>
            <form className={ "govuk-!-padding-left-5 govuk-!-padding-right-5" }>
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

                <div className={ "govuk-grid-row" }>
                    <div className="govuk-grid-column-one-quarter">
                        <div className="govuk-form-group govuk-!-margin-bottom-0">
                            <Select area-label={ "select area type" }
                                    options={ areaTypeData }
                                    value={ areaTypeData.filter(item => item.value === currentLocation.areaType) }
                                    onChange={ item => setCurrentLocation({ areaType: item.value }) }
                                    styles={ SelectOptions }
                                    isLoading={ areaTypeData.length < 1 }
                                    placeholder={ "Select area type" }
                                    className={ 'select' }/>
                        </div>
                    </div>
                    <div className="govuk-grid-column-one-quarter">
                        <div className="govuk-form-group govuk-!-margin-bottom-0">
                            <Select
                                area-label={ "select area type" }
                                options={ areaNameData.data }
                                styles={ SelectOptions }
                                value={ areaNameData.data.filter(item => item.label === currentLocation.areaName) }
                                isLoading={ data.length < 1 }
                                placeholder={ "Select area" }
                                onChange={ item => setCurrentLocation({
                                    areaType: areaNameData.grouped[item.value][0].areaType,
                                    areaName: item.value
                                }) }
                                className={ 'select' }/>
                        </div>
                    </div>
                <div className={ "govuk-grid-column-one-quarter" }>
                    <div className={ "govuk-form-group govuk-!-margin-bottom-0" }>
                        <input type={ "reset" }
                               value={ "Reset to UK" }
                               onClick={ () => setCurrentLocation({areaType: "overview", areaName: "United Kingdom"}) }
                               className={ "govuk-button govuk-button--secondary govuk-!-margin-bottom-0" }/>
                    </div>
                </div>
                </div>

            </form>
        <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible" }/>
    </>

};  // LocationPicker


export default LocationPicker;