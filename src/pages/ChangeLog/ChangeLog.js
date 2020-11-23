// @flow

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import DayPickerInput from "react-day-picker/DayPickerInput";

import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";

import Loading from "components/Loading";
import URLs from "common/urls";

import {
    Markdown,
    Article
} from './ChangeLog.styles';


import type { ComponentType } from "react";
import type { ChangeLogProps, ChangeLogItemProps } from "./ChangeLog.types";

import useGenericAPI from 'hooks/useGenericAPI';
import useTimestamp from 'hooks/useTimestamp';

const MIN_CHANGE_LOG_DATE = "2020-07-12";

const THIS_MONTH_TEXT = "This month"

const ChangeLog: ComponentType<ChangeLogProps> = ({ ...props }) => {

    const { data } = useGenericAPI({defaultResponse: []});

    const { timestamp } = useTimestamp();
            

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

 

    const getChangeDateText = (params) => {
        let changeMonthText = new Date(params.changeDate).toLocaleString('default', { month: 'long' });       
        const thisMonthText = new Date().toLocaleString('default', { month: 'long' });     
        if (changeMonthText === thisMonthText) {
            changeMonthText = THIS_MONTH_TEXT;
            params.previous = changeMonthText;
        } else if (params.previous && params.previous === changeMonthText) {
            changeMonthText = "";
        } else {
            params.previous = changeMonthText;
        }
        
        return changeMonthText;
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
                    
                    paramObj.changeDate = change.date;

                    const changeText = getChangeDateText(paramObj);
                    return<ChangeLogItem 
                        key={index}
                        changeMonthText={changeText}
                        changeLogItem={change}/>           
            })}           
       
        </Article>
    </>
        


} // ChangeLog


export default ChangeLog;
