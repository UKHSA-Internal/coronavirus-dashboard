// @flow

import React from "react";

import Timestamp from "components/Timestamp";
import { ChangeLogType } from "components/ChangeLogComponent/ChangeLogItem";
import { Link } from "react-router-dom";
import {
    AffectedAreas, ExpiryContainer, LogArea,
    LogAreasContainer, LogItemContainer,
    LogItemHeader, LogItemHeaderDates
} from "./LogItems.styles";

import type { LogItemsType, LogType } from "./LogItems.types";


const sortFunc = (a, b) => {

    return a === "UK" ? -1 : b === "UK" ? 1 : a > b || -1

}; // sortFunc


const Log: LogType<*> = ({ data }) => {

    return <LogItemContainer className={ "govuk-body-s" }>
        <LogItemHeader>
            <LogItemHeaderDates>
                <Timestamp timestamp={ data.date }
                           format={ "D MMMM YYYY" }
                           className={ "govuk-!-font-weight-bold" }/>
                {
                    data?.expiry
                        ? <ExpiryContainer>
                            <span>Expiry:</span>
                            <Timestamp timestamp={ data.expiry } format={ "D MMMM YYYY" }/>
                        </ExpiryContainer>
                        : null
                }
            </LogItemHeaderDates>
            <ChangeLogType type={ data.type }/>
        </LogItemHeader>
        <div className={ "govuk-body-m govuk-link govuk-!-font-weight-bold govuk-!-margin-bottom-0 " }>
            <Link className={ "govuk-link govuk-!-padding-right-3" }
                  to={ `/details/whats-new/record/${data.id}` }>
                { data.heading }
            </Link>
        </div>
        <AffectedAreas>
            <span>Affected&nbsp;areas:</span>
            <LogAreasContainer>{
                !data.applicable_to.length
                    ? <span className={ "na" }>N/A</span>
                    : data.applicable_to.sort(sortFunc).map(item =>
                        <LogArea key={ item }>{ item }</LogArea>
                    )
            }</LogAreasContainer>
        </AffectedAreas>
    </LogItemContainer>;

};  // Log


const LogItems: LogItemsType<*> = ({ data }) => {

    return <ul className={ "govuk-list" }>{
        data.map(item => <Log key={ item.id } data={ item }/>)
    }</ul>;

};  // LogItems


export default LogItems;
