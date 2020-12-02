// @flow


import React, { useState, useEffect, useRef } from 'react';

import { Link } from "react-router-dom";

import DayPickerInput from "react-day-picker/DayPickerInput";

import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";


import FormItem, { Form } from "components/Formset";

import {
    Container,
    MainContent,
    SideContent,
    ChangeMonthContainer
} from './ChangeLogComponent.styles';



import type { ComponentType } from "react";
import type { ChangeLogProps, ChangeLogItemProps } from "./ChangeLog.types";

import useGenericAPI from 'hooks/useGenericAPI';

const MIN_CHANGE_LOG_DATE = "2020-07-12";

const THIS_MONTH_TEXT = "This month"

const THIS_MONTH = "" + new Date().getMonth() + new Date().getFullYear();

const searchTypeOptions = {   
    choices: [
        { label: "New metric", value: "New metric"  },
        { label: "Change to metric", value: "Change to metric" },
        { label: "New feature", value: "New feature" }
    ]
};

const ChangeLogComponent = ( { data }) => {

    const metricStates = {
        newMetric: false,
        newFeature: false,
        changeMetric: false
    }

    const changeMonthRef = useRef(THIS_MONTH);

    const [changeLogType, setChangeLogType] = useState(metricStates);
    const [changeLogSearch, setChangeLogSearch] = useState(null);

    const ChangeLogItemBody = ({ body, linktext, relativeUrl }) => {
       
        return  <div id={ "change-log-body" }>
                    <p>{body} <strong><Link to={relativeUrl}>{linktext}</Link></strong></p>         
                 </div>
    };

    const ChangeLogItem: ComponentType<ChangeLogItemProps> = ({ changeLogItem }) => {

        const changeMonthText = getChangeDateText( changeLogItem.date );
    
        return  <div>
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
                       
                    <ChangeLogItemBody body={changeLogItem.body}
                                            linktext={changeLogItem.linkText}
                                            relativeUrl={changeLogItem.relativeUrl}/>     
                </div>
    
    }

    const filterByType = (type, newMetric, changeMetric, newFeature) => {
        return true
    }; // filterByType 

    const filterBySearch = (search) => {
        const pattern = new RegExp(changeLogSearch.toLowerCase());
        return pattern.exec(search.toLowerCase());
    }; // filterBySearch 


    const filterData = (item) => {
        
        if (!changeLogType && !changeLogSearch) {
            return true;
        }
        else if (changeLogType && changeLogSearch) {
            // alert ("here")
            return filterByType(item) && filterBySearch(item.body);
        }
        else if (changeLogType.newMetric || changeLogType.changeMetric || changeLogType.newFeature) {
            return filterByType(item,
                                 changeLogType.newMetric,
                                 changeLogType.changeMetric,
                                 changeLogType.newFeature);
        } 
        else if (changeLogSearch) {
            return filterBySearch(item.body);
        }
        else {
            return true;
        }
    }; // filterData


    // reverse sort
    const sortData = (a, b) => {
        const
            dateA = new Date(a.date),
            dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();

    }; // sortData

    // assumes data is sorted in reverse date order
    const getChangeDateText = (changeDate) => {

        const changeMonth = "" + new Date(changeDate).getMonth() + new Date(changeDate).getFullYear();
        
        if (changeMonth === THIS_MONTH) {
            changeMonthRef.current = changeMonth;
            return <p className="govuk-body-s govuk-!-margin-top-1"><strong>{ THIS_MONTH_TEXT }</strong></p> 
        }

        if (changeMonthRef.current !== changeMonth) {
            changeMonthRef.current = changeMonth;
            const element = new Date(changeDate).toLocaleString('default', { month: 'long' });
            return <ChangeMonthContainer>
                        <p className="govuk-body-s govuk-!-margin-top-2"><strong>{ element }</strong></p> 
                   </ChangeMonthContainer>
            return 
        }
        
        return null;
        
    }; // getChangeDateText

    return <>

        <Container>
            <MainContent className={ "no-border" }>

                <p className={ "govuk-body govuk-!-margin-top-1 govuk-!-margin-bottom-1" }>
                    We regularly update the dashboard with new data and features.
                    Here&#39;s a timeline of changes.
                </p>
        
                {
                    data.filter(filterData).sort(sortData).map((change, index) => { 
                        return<ChangeLogItem 
                            key={index}
                            changeLogItem={change}/>           
                })}           
    
            </MainContent>

            <SideContent>
                <h2 className={ "govuk-heading-s govuk-!-margin-top-3 govuk-!-margin-bottom-3" }>
                    Filter
                </h2>
            
                <div id={ "filterChangeLog" } className={ "govuk-!-margin-top-1" }>
                    <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>

                        <FormItem aria-labelledby={ "aria-search-filter-label" }
                                aria-describedby={ "aria-search-filter-descr" }
                                width={ "two-third" }>
                            <span
                                id={ "search-filter-label" }
                                className={ "govuk-label govuk-label--s" }>
                                Search
                            </span>
                
                            <div aria-describedby={ "search-filter-descr" }
                                aria-labelledby={ "search-filter-label" }>
                                    <input 
                                        className={ "govuk-input govuk-input--width-10" }
                                        type={ "text" }
                                        onChange={ (item) => setChangeLogSearch(item.target.value) }/>
                            </div>
                        </FormItem>

                        <FormItem aria-labelledby={ "aria-type-filter-label" }
                                aria-describedby={ "aria-type-filter-descr" }
                                width={ "two-third" }>

                            <span
                                id={ "type-filter-label" }
                                className={ "govuk-label govuk-label--s" }>
                                Type
                            </span>
                            <div aria-describedby={ "type-filter-descr" }
                                aria-labelledby={ "type-filter-label" }>
                                     <label htmlFor={ "newMetric" }>
                                        <input
                                            name="newMetric"
                                            type="checkbox"
                                            checked={changeLogType.newMetric}
                                            onChange={(type) => setChangeLogType({...changeLogType, newMetric: !changeLogType.newMetric }) }/>
                                        New metric
                                    </label>
                            </div>

                            <div aria-describedby={ "type-filter-descr" }
                                aria-labelledby={ "type-filter-label" }>
                                     <label htmlFor={ "changeMetric" }>
                                        <input
                                            name="changeMetric"
                                            type="checkbox"
                                            checked={changeLogType.changeMetric}
                                            onChange={(type) => setChangeLogType({...changeLogType, changeMetric: !changeLogType.changeMetric }) }/>
                                        Change to metric
                                    </label>
                            </div>

                            <div aria-describedby={ "type-filter-descr" }
                                aria-labelledby={ "type-filter-label" }>
                                     <label htmlFor={ "newFeature" }>
                                        <input
                                            name="newFeature"
                                            type="checkbox"
                                            checked={changeLogType.newFeature}
                                            onChange={(type) => setChangeLogType({...changeLogType, newFeature: !changeLogType.newFeature }) }/>
                                        New feature
                                    </label>
                            </div>
                            
                        </FormItem>
                        
                    </Form>
                </div>
        
            </SideContent>

        </Container>
    </>
};

export default ChangeLogComponent;