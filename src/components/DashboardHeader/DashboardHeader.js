// @flow

import React, { Fragment, useState, useEffect, useRef } from "react";
import type { ComponentType } from 'react';
import { withRouter, useHistory } from 'react-router';
import { max } from "d3-array";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { getParams, createQuery } from "common/utils";


import {
    CollapsibleLink,
    HeaderContainer,
    Title,
    TriangleRight,
    TriangleDown,
    CollapsibleLinkContainer,
    Select
} from './DashboardHeader.styles'

import type { Props } from './DashboardHeader.types';

import AreaHierarchy from "hooks/useLoadData";


import MomentLocaleUtils, {
    formatDate,
    parseDate
} from 'react-day-picker/moment';
import moment from "moment";
import 'moment/locale/en-gb';
import axios from "axios";
import URLs from "../../common/urls";
import { get } from "leaflet/src/dom/DomUtil";

const PathNameMapper = {
    "/": "Daily Summary",
    "/cases": "Cases",
    "/tests": "Tests",
    "/healthcare": "Healthcare",
    "/deaths": "Deaths",
    "/about-data": "About data",
    "/cookies": "Cookies",
    "/accessibility": "Accessibility",
    "/archive": "Archive"
};


const NoPickerPaths = [
    "/about-data",
    "/cookies",
    "/accessibility",
    "/archive"
];


const GetLookup = () => {

    const [ lookupTable, setLookupTable ] = useState(null)

    useEffect(() => {

        const getData = async () => {

            const { data } = await axios.get('lookupTable_bothWay_v1.json', { baseURL: URLs.lookups });

            setLookupTable(data)
        }

        getData()

        return () => {}

    }, [])

    return lookupTable

}

const GetDataFor = (hierarchy, lookup) => {

    const
        flatHierarchy = Object
            .keys(hierarchy)
            .reduce((acc, item) =>
                [...acc, ...hierarchy[item].map(value => ({...value, type: item}))],
                []
            );



    // itemName is the parentName for getting children and the childName for getting
    // the parent - Default behaviour is to get the children.
    return (areaType: string, itemName: string | null, getParent: boolean = false): Array<string> | string | null => {

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

            return []

        } else {

            // Getting the parent
            for ( const { name, code, type } of flatHierarchy ) {

                if ( name !== itemName || areaType !== type ) continue;

                for ( const item of flatHierarchy ) {
                    if ( item.code === lookup[type][code].p ) {
                        console.log(`>?> ${ areaType } ${ item.code } ${ lookup[type][code].p } ${ itemName } ${ item.name }`)
                        return item.name
                    }
                }

            }

            return ""

        }

    }


};


const usePrevious = (value, getData) => {

    const ref = useRef([
            // These must be ordered.
            { areaType: "nation", areaName: null, options: getData("nation", null) },
            { areaType: "region", areaName: null, options: getData("region", null) },
            { areaType: "utla",   areaName: null, options: getData("utla", null)   },
            { areaType: "ltla",   areaName: null, options: getData('ltla', null)   },
        ])

    useEffect(() => {

        ref.current = value

    })

    return ref.current

};


const LocationPicker: ComponentType<Props> = ({ hierarchy, query }) => {

    const
        lookup = GetLookup(),
        getData = GetDataFor(hierarchy, lookup),
        history = useHistory(),
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
        initialParam = getParams(query),
        [ location, setLocation ] = useState([]),
        previousLocation = usePrevious(location, getData);


    useEffect(() => {

        // const defaultLocations = [
        //     // These must be ordered.
        //     { areaType: "nation", areaName: null, options: getData("nation", null) },
        //     { areaType: "region", areaName: null, options: getData("region", null) },
        //     { areaType: "utla",   areaName: null, options: getData("utla", null)   },
        //     { areaType: "ltla",   areaName: null, options: getData('ltla', null)   },
        // ];

        getStateFor(
            getParamValueFor(initialParam, "areaName"),
            order?.[getParamValueFor(initialParam, "areaType")] ?? null,
            // defaultLocations
        )

    }, [lookup, hierarchy]);


    const getStateFor = (value, areaTypeItem) => {

        let
            prevState = previousLocation,
            newLocation = [],
            tempLoc;

        for ( let index = 0; index < prevState.length; index++ ) {
            console.log(tempLoc?.areaName ?? null)
            tempLoc = (prevState[index].areaType === areaTypeItem?.key ?? null)
                ? {
                    areaType: areaTypeItem.key,
                    areaName: value,
                    options: getData(areaTypeItem.key, areaTypeItem.parent)
                }
                : {
                    ...prevState[index],
                    options: getData(prevState[index].areaType, tempLoc?.areaName ?? null)
                };

            console.log(prevState[index].areaType)
            console.log(tempLoc)
            newLocation.push(tempLoc)
        }

        const indOfMain = Object.keys(order).indexOf(areaTypeItem?.key ?? null);

        for ( let index = newLocation.length; index > 0; index -- ) {

            if ( !(newLocation[index]?.areaName ?? null) ) continue;

            newLocation[index - 1].areaName = getData(
                newLocation[index].areaType,
                newLocation[index].areaName,
                true
            );

        }

        setLocation(newLocation)

    };

    const getParamValueFor = (params: Array<{ key: string, value: string, sign: string }>, keyName: string): string | null => {

        return params.reduce((acc, { key, value }) => key === keyName ? value : acc, null)

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

        history.push(`/${ newQuery }`)

    };

    console.log(location)

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
                            options.map(({ name, code }) =>
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
                           onClick={ () => history.push('/') }
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
}


const DatePicker: Component<Props> = ({ baseDate = '', ...props }: Props) => {

    return <DayPickerInput
        formatDate={ formatDate }
        parseDate={ parseDate }
        placeholder={ `${ formatDate(new Date(baseDate), 'DD/MM/YYYY', 'en-gb') }` }
        format={ "DD/MM/YYYY" }
        dayPickerProps={ {
            locale: 'en-gb',
            localeUtils: MomentLocaleUtils,
            disabledDays: [{
                before: new Date(2020, 0, 30),
                after: new Date()
            }]
        } }
        { ...props }
    />


};


const DateRangePicker: ComponentType<Props> = ({ query, startDate, endDate }: Props) => {

    const
        [ fromDate, setFromDate ] = useState(startDate.format("YYYY-MM-DD")),
        [ toDate, setToDate ] = useState(endDate.format("YYYY-MM-DD")),
        history = useHistory();

    const handleSubmission = event => {

        event.preventDefault();

        const
            start = moment(fromDate).format("YYYY-MM-DD"),
            end = moment(toDate).format("YYYY-MM-DD"),
            newQuery = createQuery([
                ...getParams(query),
                {key: 'specimenDate', sign: '>', value: start},
                {key: 'specimenDate', sign: '<', value: end}
            ]);

        history.push(`/${newQuery}`)

    }

    return <div id={ "datepicker" } className={ "govuk-!-margin-top-3" } style={ { display: 'block' } }>
        <form className={ "govuk-!-padding-left-5 govuk-!-padding-right-5" } onSubmit={ handleSubmission }>

            <div className="govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                <div className="govuk-grid-column-two-thirds">

                    <h4 className="govuk-heading-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                        Select a date range
                    </h4>

                </div>
            </div>
            <div className="govuk-grid-row govuk-!-margin-top-0">
                <div className="govuk-grid-column-one-quarter">
                    <div id="myDatepicker" className="datepicker">
                        <div className="date govuk-form-group govuk-!-margin-bottom-0">
                            <label className="govuk-label" htmlFor="id-textbox-1">
                                From date
                            </label>
                            <DatePicker
                                baseDate={ fromDate }
                                onDayChange={ setFromDate }
                            />
                        </div>
                    </div>
                </div>

                <div className="govuk-grid-column-one-quarter">
                    <div id="myDatepicker" className="datepicker">
                        <div className="date govuk-form-group govuk-!-margin-bottom-0">
                            <label className="govuk-label" htmlFor="id-textbox-2">
                                To date
                            </label>
                            <DatePicker
                                baseDate={ toDate }
                                onDayChange={ setToDate }
                            />
                        </div>
                    </div>
                </div>

                <div className="govuk-grid-column-one-quarter">

                    <ul className="govuk-list govuk-!-margin-bottom-0">
                        <li>
                            <a className="govuk-link" href="#">Last 7 days</a>
                        </li>
                        <li>
                            <a className="govuk-link" href="#">Last 30 days</a>
                        </li>
                        <li>
                            <a className="govuk-link" href="#">Last quarter</a>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                <div className="govuk-grid-column-full">
                        <input
                            type={ "submit" }
                            className={ "govuk-button govuk-!-margin-right-1 govuk-!-margin-bottom-0" }
                            value={ "Update date range" }
                        />

                        <input
                            type={ "reset" }
                            className={ "govuk-button govuk-button--secondary govuk-!-margin-bottom-0" }
                            value={ "Reset to all time" }
                        />


                </div>
            </div>

        </form>

        <div className="govuk-grid-row govuk-!-margin-top-0">
            <div className="govuk-grid-column-full">
                <hr className="govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible"/>
            </div>
        </div>

    </div>

}


const DashboardHeader: ComponentType<Props> = ({ title, location: { search: query, pathname } }: Props) => {

    const
        hierarchy = AreaHierarchy(),
        [locationPickerState, setLocationPickerState] = useState(false),
        [datePickerState, setDatePickerState] = useState(false),
        params = getParams(query),
        currentLocation = params.reduce((acc, { key, value }) => (key === 'areaName' ? value : acc), 'United Kingdom'),
        startDate = params.reduce((acc, { key, sign, value }) => ((key === 'specimenDate' && sign === '>') ? moment(value) : acc), moment('2020-01-30')),
        endDate = params.reduce((acc, { key, sign, value }) => ((key === 'specimenDate' && sign === '<') ? moment(value) : acc), moment()),
        isExcluded = NoPickerPaths.indexOf(pathname) > -1;

    return (
        <div className={ "sticky-header govuk-!-padding-top-3" }>
            <HeaderContainer>
                <Title>{ PathNameMapper[pathname] }</Title>
                {
                    isExcluded
                        ? null
                        : <CollapsibleLinkContainer>
                            <CollapsibleLink htmlType={ "button" }
                                         onClick={ () => setLocationPickerState(!locationPickerState) }>
                            { locationPickerState ? <TriangleDown/> : <TriangleRight/> }
                            <span className={ "govuk-body-s govuk-body govuk-body govuk-!-margin-bottom-0" }>
                                    <b>Location:</b>&nbsp;{ currentLocation }
                                </span>
                        </CollapsibleLink>
                        <CollapsibleLink htmlType={ "button" }
                                         onClick={ () => setDatePickerState(!datePickerState) }>
                            { datePickerState ? <TriangleDown/> : <TriangleRight/> }
                            <span className={ "govuk-body-s change-location govuk-body govuk-!-margin-bottom-0 " }>
                                    <b>Date:</b> { startDate.format("D MMM YYYY") } - { endDate.format("D MMM YYYY") }
                                </span>
                        </CollapsibleLink>
                    </CollapsibleLinkContainer>
            }
            </HeaderContainer>
            <div className={ "govuk-grid-row govuk-!-margin-top-0 govuk-!-margin-bottom-4" }>
                <div className={ "govuk-grid-column-full" }>
                    <hr className={ "govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible" }/>
                </div>
            </div>
            { ( locationPickerState && !isExcluded )? <LocationPicker hierarchy={ hierarchy } query={ query }/> : null }
            { ( datePickerState && !isExcluded ) ? <DateRangePicker query={ query } startDate={ startDate } endDate={ endDate }/> : null }
        </div>
    );
};

export default withRouter(DashboardHeader);
