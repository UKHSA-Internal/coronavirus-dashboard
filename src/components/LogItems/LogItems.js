// @flow

import React from "react";
import type { ComponentType } from "react";
import Timestamp from "components/Timestamp";
import { ChangeLogType } from "components/ChangeLogComponent/ChangeLogItem";
import { Link } from "react-router-dom";
import { LogItemContainer, LogItemHeader, LogItemHeaderDates } from "./LogItems.styles";


const Log: ComponentType<*> = ({ data }) => {

    return <LogItemContainer className={ "govuk-body-s" }>
        <LogItemHeader>
            <LogItemHeaderDates>
                <Timestamp timestamp={ data.date }
                           format={ "D MMMM YYYY" }
                           className={ "govuk-!-font-weight-bold" }/>
                <span>
                    Expiry:&nbsp;
                {
                    data?.expiry
                        ? <Timestamp timestamp={ data.expiry } format={ "D MMMM YYYY" }/>
                        : <span style={{ color: "#797979" }}>N/A</span>
                }
                </span>
            </LogItemHeaderDates>
            <ChangeLogType type={ data.type }/>
        </LogItemHeader>
        <Link className={ "govuk-body-m govuk-link govuk-!-margin-bottom-0 govuk-!-padding-right-3" }
              to={ `/details/whats-new/record/${data.id}` }>
            { data.heading }
        </Link>
    </LogItemContainer>;

};  // Log


const LogItems: ComponentType<*> = ({ data }) => {

    return <ul className={ "govuk-list" }>{
        data.map(item => <Log key={ item.id } data={ item }/>)
    }</ul>;

};  // LogItems


export default LogItems;
