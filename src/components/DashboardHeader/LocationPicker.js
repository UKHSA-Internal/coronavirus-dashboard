// @flow

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { createQuery, getParams, groupBy } from "common/utils";
import { getOrder } from "./GenericHooks";
import useApi from "hooks/useApi";
import { PathNames } from "./Constants";
import Select from "react-select";
import { LocalisationForm, LocalisationFormInputs } from "./DashboardHeader.styles";


const getDefaultOutput = ( pathname ) => {

    switch (pathname.toLowerCase()) {

        case PathNames.healthcare:
            return [
                // These must be ordered.
                "nhsNation",
                "nhsRegion",
                // "nhsTrust"
            ];

        case PathNames.testing:
        case PathNames.deaths:
        case PathNames.cases:
        default:
            return [
                // These must be ordered.
                "nation",
                "region",
                "la"  // utla + ltla
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
    }),
    placeholder: styles => ({
        ...styles,
        color: "#6B7276"
    })
};


const LocationPicker = ({ show, setCurrentLocation, currentLocation }) => {

    const
        history = useHistory(),
        order = getOrder(history),
        pathname = history.location.pathname,
        query = history.location.search,
        newQuery = currentLocation.areaName && createQuery([
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
        defaultOutput = getDefaultOutput(pathname),
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
                         ...defaultOutput
                             .filter(item => item !== "la")
                             .map(item => ({key: "areaType", sign: '=', value: item })),
                         ...defaultOutput.indexOf("la") > -1
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
            history.push({
                pathname: pathname,
                search: newQuery
            });

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
            <LocalisationForm role={ 'form' }>
                <div className={ "govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2" }>
                    <div className={ "govuk-grid-column-two-thirds" }>
                        <h2 className={ "govuk-heading-s govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                            Select a location to customise data
                        </h2>
                        <p className={ "govuk-!-margin-top-1 govuk-!-margin-bottom-1 govuk-body-s" }>
                            Please note not all data is available for every location.
                        </p>
                    </div>
                </div>

                <LocalisationFormInputs>
                    <div className="govuk-grid-column-one-quarter">
                        <div className="govuk-form-group govuk-!-margin-bottom-0">
                            <span id={ "aria-type-label" }
                                  className={ "govuk-label govuk-label--s" }>Area type</span>
                            <span id={ "aria-type-description" }
                                  className={ "govuk-visually-hidden" }>
                                Select or type in an area type then press enter (return).
                                The options in the area name selector update based on the
                                selected area type.
                            </span>
                            <div aria-labelledby={ "aria-type-label" }
                                  aria-describedby={ 'aria-type-description' }>
                                <Select options={ areaTypeData }
                                        value={ areaTypeData.filter(item => item.value === currentLocation.areaType) }
                                        onChange={ item => setCurrentLocation({ areaType: item.value }) }
                                        styles={ SelectOptions }
                                        isLoading={ areaTypeData.length < 1 }
                                        placeholder={ "Select area type" }
                                        className={ 'select' }/>
                            </div>
                        </div>
                    </div>
                    <div className="govuk-grid-column-one-quarter">
                        <div className="govuk-form-group govuk-!-margin-bottom-0">
                            <span id={ "aria-name-label" }
                                  className={ "govuk-label govuk-label--s" }>Area name</span>
                            <span id={ "aria-name-description" }
                                  className={ "govuk-visually-hidden" }>
                                Select or type in an area name then press enter (return).
                                The page will immediately update to display the data for
                                the selected area.
                            </span>
                            <div aria-labelledby={ "aria-name-label" }
                                  aria-describedby={ 'aria-name-description' }>
                                <Select options={ areaNameData.data }
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
                    </div>
                    <div className={ "govuk-grid-column-one-quarter" }>
                        <div className={ "govuk-form-group govuk-!-margin-bottom-0" }>
                            <Link to={ pathname }
                                  onClick={ () => setCurrentLocation({ areaType: "overview", areaName: "United Kingdom" }) }
                                  className={ "govuk-button govuk-button--secondary govuk-!-margin-bottom-0" }>
                                <span className={ "govuk-visually-hidden" }>
                                    Click to reset the page back to UK level.
                                </span>
                                Reset to UK
                            </Link>
                        </div>
                    </div>
                </LocalisationFormInputs>

            </LocalisationForm>
        <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible" }/>
    </>

};  // LocationPicker


export default LocationPicker;