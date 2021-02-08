// @flow

import React, { useState, useEffect } from 'react';

import moment from "moment";

import { Form } from "components/Formset";
import { groupBy, sort } from "common/utils";

import {
    Container, MainContent, SideContent,
    MonthlyGroup, MonthlyHeader
} from './ChangeLogComponent.styles';

import type { ChangeLogInputProps } from "./ChangeLogComponent.types";
import type { ComponentType } from "react";

import { ChangeLogItem } from "./ChangeLogItem";
import { ChangeLogTextSearch, searchContent } from "./ChangeLogTextSearch";
import BrowserHistory from "../BrowserHistory";


const ChangeLogItemHeader: ComponentType = ({ date }) => {

    return <MonthlyHeader>
        <h2 className={ "govuk-heading-m" } id={ `monthly_${date}` }>
            <time dateTime={ date }>
                <span className={ "govuk-visually-hidden" }>
                    List of changes in the month of
                </span>
                { moment(date).format("MMMM YYYY") }
            </time>
        </h2>
    </MonthlyHeader>

}; // ChangeLogItemHeader


const DateGroup: ComponentType = ({ data, group, colours, changeTypes }) => {

    return <MonthlyGroup aria-describedby={ `monthly_${group}` }>
        <ChangeLogItemHeader date={ group }/>
        {
            data.map((change, index ) =>
                <ChangeLogItem id={ `cl-item-${ index }` }
                               key={ `cl-item-${ index }` }
                               data={ change }
                               changeTypes={ changeTypes }
                               index={ index }
                               colour={ colours.find(element => element.type === change.type) }/>
            )
        }
    </MonthlyGroup>

};  // DateGroup


const ChangeLogComponent: ComponentType = ({ data, colours }: ChangeLogInputProps) => {

    const changeTypes = new Set(data.map(item => item.type));
    // const [changeLogType, setChangeLogType] = useState(changeTypes.map(item => ({[item]: true})));
    const [changeLogSearch, setChangeLogSearch] = useState("");
    const [groupedData, setGroupedData] = useState([]);

    // const filterByType = (item) => {
    //
    //     const keys = Object.keys(changeLogType).filter(key => changeLogType[key]);
    //     return Object.values(keys).some((key) => changeTypes[key] === item.type);
    //
    // }; // filterByType
    //
    // const isTypeSet = () => {
    //
    //     return Object.keys(changeLogType).some((key) => changeLogType[key]);
    //
    // } // isTypeSet

    useEffect(() => {

        setGroupedData(groupBy(
            data.filter(item => searchContent(item, changeLogSearch)),
            item => item.date.substring(0, 7)
        ))

    }, [changeLogSearch, data])


    return <>
        <Container>
            <BrowserHistory>
                <MainContent className={ "no-border" }>
                    <p className={ "govuk-body govuk-!-margin-top-1 govuk-!-margin-bottom-0" }>
                        We regularly update the dashboard with new data and features.
                        Here is a timeline of changes.
                    </p>

                    <div className={ "govuk-!-margin-top-1" }>
                        {
                            Object
                                .keys(groupedData)
                                .sort(sort)
                                .map(groupKey =>
                                    <DateGroup data={ groupedData[groupKey] }
                                               group={ groupKey }
                                               changeTypes={ changeTypes }
                                               colours={ colours }
                                               key={ groupKey }/>
                                )
                        }
                    </div>
                </MainContent>
            </BrowserHistory>
            <SideContent>
                <div className={ "govuk-!-margin-top-1" }>

                    <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>
                        <ChangeLogTextSearch changeLogSearch={ changeLogSearch }
                                             setChangeLogSearch={ setChangeLogSearch }/>
                        {/*<ChangeLogType data={ data } changeTypes={ changeTypes } changeLogType={ changeLogType }*/}
                        {/*               setChangeLogType={ setChangeLogType }/>*/}
                    </Form>
                </div>
            </SideContent>
        </Container>
    </>
}; //ChangeLogComponent

export default ChangeLogComponent;