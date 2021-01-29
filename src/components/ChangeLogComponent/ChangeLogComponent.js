// @flow

import React, { useState, useEffect } from 'react';

import moment from "moment";

import { Form } from "components/Formset";
import { sortByDate, groupBy } from "common/utils";

import {
    Container,
    MainContent,
    SideContent
} from './ChangeLogComponent.styles';

import type { ChangeLogInputProps } from "./ChangeLogComponent.types";
import type { ComponentType } from "react";

import { ChangeLogItem } from "./ChangeLogItem";
import { ChangeLogTextSearch, searchContent } from "./ChangeLogTextSearch";


const ChangeLogItemHeader: ComponentType = ({ change }) => {

    return <header>
        <hr className={ "govuk-section-break govuk-section-break--m govuk-section-break--visible" }/>
        <h2 className={ "govuk-heading-s" }>
            { change }
        </h2>
    </header>

}; // ChangeLogItemHeader


const DateGroup: ComponentType = ({ data, group, colours, changeTypes }) => {

    return <article>
        <ChangeLogItemHeader change={ group }/>
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
    </article>

};  // DateGroup


const ChangeLogComponent: ComponentType = ({ data, colours }: ChangeLogInputProps) => {

    const changeTypes = new Set(data.map(item => item.type));
    const [changeLogType, setChangeLogType] = useState(changeTypes.map(item => ({[item]: true})));
    const [changeLogSearch, setChangeLogSearch] = useState("");
    const [groupedData, setGroupedData] = useState([]);

    const filterByType = (item) => {

        const keys = Object.keys(changeLogType).filter(key => changeLogType[key]);
        return Object.values(keys).some((key) => changeTypes[key] === item.type);

    }; // filterByType

    const isTypeSet = () => {

        return Object.keys(changeLogType).some((key) => changeLogType[key]);

    } // isTypeSet

    useEffect(() => {

        setGroupedData(groupBy(
            data.sort(sortByDate).filter(item => searchContent(item, changeLogSearch)),
            item => moment(item.date).format("MMMM YYYY")
        ))

    }, [changeLogSearch, data])

    return <>

        <Container>
            <MainContent className={ "no-border" }>

                <p className={ "govuk-body govuk-!-margin-top-1 govuk-!-margin-bottom-0" }>
                    We regularly update the dashboard with new data and features.
                    Here is a timeline of changes.
                </p>

                <div className={ "govuk-!-margin-top-1" }>
                    {
                        Object
                            .keys(groupedData)
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