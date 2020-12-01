// @flow

import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";

import DayPickerInput from "react-day-picker/DayPickerInput";

import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";

import Loading from "components/Loading";

import {
    Markdown,
    Article
} from './ChangeLog.styles';


import type { ComponentType } from "react";
import type { ChangeLogProps, ChangeLogItemProps } from "./ChangeLog.types";

import useGenericAPI from 'hooks/useGenericAPI';
import useTimestamp from 'hooks/useTimestamp';
import { TH } from 'components/GovUk/Table.styles';

const MIN_CHANGE_LOG_DATE = "2020-07-12";

const THIS_MONTH_TEXT = "This month"

const THIS_MONTH = new Date().toLocaleString('default', { month: 'long' });

const ChangeLogData = [
    { 
        "date": "2020-10-26",
        "linkText": "Cases by age group",
        "relativeUrl": "/details/cases",
        "body": "These have been added to the cases page. The current trend is a higher rate is starting to appear in the over 60s, leading to increased hospital admissions"
    },

    { 
        "date": "2020-10-22",
        "linkText": "Local R numbers",
        "relativeUrl": "/",
        "body": "When you search for a postcode, the local R number for the region will now be displayed."
    },

    { 
        "date": "2020-10-19",
        "linkText": "Local alert levels",
        "relativeUrl": "/",
        "body": "When you search for a postcode, the local alert level will now be displayed."
    },

    { 
        "date": "2020-11-01",
        "linkText": "View Data",
        "relativeUrl": "/",
        "body": "November 01 Metric Change"
    },

    { 
        "date": "2020-09-01",
        "linkText": "View Data",
        "relativeUrl": "/",
        "body": "September 01 Metric Change"
    },
    { 
        "date": "2020-12-25",
        "linkText": "December Change",
        "relativeUrl": "/",
        "body": "December Change"
    },

]

const ChangeLog: ComponentType<ChangeLogProps> = ({ ...props }) => {

    const data = ChangeLogData //useGenericAPI({url: "changeLog", defaultResponse: []});

    const { timestamp } = useTimestamp();

    const changeMonthRef = useRef(THIS_MONTH)
            

    const [changeLogType, setChangeLogType] = useState('');
    const [changeLogDate, setChangeLogDate] = useState(null);

    const paramObj = {
        changeDate: null,
        previous: null
    };


    const filterByType = (text) => {
        const pattern = new RegExp(changeLogType.toLowerCase());
        return pattern.exec(text.toLowerCase());
    }

    const filterByDate = (dte) => {
        return new Date(dte, "YYYY-MM-DD").getTime() === new Date(changeLogDate.value, "YYYY-MM-DD").getTime();
    }

    const filterData = (item) => {

        if (!changeLogType && !changeLogDate) {
            return true;
        }
        else if (changeLogType && changeLogDate) {
            return filterByType(item.body) && filterByDate(item.date);
        }
        else if (changeLogType) {
            return filterByType(item.body);
        } 
        else if (changeLogDate) {
            return filterByDate(item.date);
        }
        else {
            return true;
        }
    };


    // reverse sort
    const sortData = (a, b) => {
        const
            dateA = new Date(a.date),
            dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
    };

 

    const getChangeDateText = (changeDate) => {

        const changeMonthText = new Date(changeDate).toLocaleString('default', { month: 'long' });  
        
        if (changeMonthText === THIS_MONTH) {
            changeMonthRef.current = THIS_MONTH_TEXT;
            return changeMonthRef.current;
        }

        if (changeMonthRef.current !== changeMonthText) {
            changeMonthRef.current = changeMonthText;
            return changeMonthRef.current;
        }
        
        return null;
        
    }

   

    const ChangeLogItem: ComponentType<ChangeLogItemProps> = ({ changeLogItem, changeMonthText }) => {

        return <div>
                     <div id={ "change-log-month" }>
                        <p className="govuk-body-m govuk-!-margin-top-1">
                            <strong>{changeMonthText}</strong>
                        </p>
                    </div>
                    <div id={ "change-log-date" }>
                        <p className="govuk-body-s govuk-!-margin-top-1">
                            {formatDate(changeLogItem.date, "DD MMM YYYY")}
                        </p>
                    </div>
                    
                    <div id={ "change-log-body" }>
                        <Markdown dangerouslySetInnerHTML={{ __html: changeLogItem.body }}/>
                    </div>

                    <div id={ "change-log-link" }>
                        <p className="govuk-body-s govuk-!-margin-top-1">
                            <strong><Link to={changeLogItem.relativeUrl}>{changeLogItem.linkText}</Link></strong>
                        </p>
                    </div>
                   
            </div>

    }


    if ( !data ) return <Loading/>;

    return <>
       

        <div style={{display: 'flex'}}>
            <span id={ "date-filter-label" } className={ "govuk-visually-hidden" }>
                Change Date
            </span>
            <div aria-describedby={ "date-filter-descr" }
                aria-labelledby={ "date-filter-label" }
                style={{marginRight: '10px'}}>
                <DayPickerInput
                    format={ "DD/MM/YYYY" }
                    formatDate={ formatDate }
                    parseDate={ parseDate }
                    onDayChange={(item) => setChangeLogDate(item)}
                    placeholder={ "Filter by date" }
                    dayPickerProps={{
                        locale: 'en-gb',
                        localeUtils: MomentLocaleUtils,
                        disabledDays: [{
                            before: new Date(MIN_CHANGE_LOG_DATE),
                            after:  { timestamp }
                            }]
                }} />
            </div>

            <span id={ "date-filter-label" } className={ "govuk-visually-hidden" }>
                Change Text
            </span>
            <div aria-describedby={ "date-filter-descr" }
                aria-labelledby={ "date-filter-label" }
                >
                    <input 
                        className={ "govuk-input govuk-input--width-10" }
                        type={ "text" }
                        placeholder={ "Filter by text" }
                        onChange={ (item) => setChangeLogType(item.target.value) }
                    />
            </div>
        </div>

        <Article>
           
            {
                data.filter(filterData).sort(sortData).map((change, index) => { 

                    const changeText = getChangeDateText(change.date);
                    return<ChangeLogItem 
                        key={index}
                        changeMonthText={changeText}
                        changeLogItem={change}/>           
            })}           
       
        </Article>
    </>
        


} // ChangeLog


export default ChangeLog;
