// @flow

import React, { useState, useRef } from 'react';

import useTimestamp from 'hooks/useTimestamp';

import { Link } from "react-router-dom";

import MomentLocaleUtils, {
    formatDate
} from "react-day-picker/moment";

import moment from "moment";

import FormItem, { Form } from "components/Formset";

import {
    Container,
    MainContent,
    SideContent,
    ChangeMonthContainer
} from './ChangeLogComponent.styles';

import type { ComponentType } from "react";
import type { ChangeLogProps, ChangeLogItemProps } from "./ChangeLog.types";
import { index } from 'd3-array';
import { objectsAreEqual } from 'components/Map/utils';

const THIS_MONTH_TEXT = "This month";

const today = new Date();

const THIS_MONTH = "" +  today.getMonth() + today.getFullYear();

const ChangeLogComponent = ( { data }) => {

    let metricStates = {};

    Object.keys(data.type).map(key => {
        metricStates[key] = false;
    });

    const changeMonthRef = useRef(THIS_MONTH);
    const changeDateRef = useRef(null);

    const timestamp = useTimestamp();

    const [changeLogType, setChangeLogType] = useState(metricStates);
    const [changeLogSearch, setChangeLogSearch] = useState(null);

    const ChangeLogItemBody = ({ change, index }) => {

        const id = "metric_" + index
       
        return  <div id={ id } className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0">
                    <p className="govuk-body-s govuk-!-margin-top-0">
                        <strong>{change.headline}</strong> {change.type}
                    </p>
                    <p className="govuk-body-s govuk-!-margin-top-0">
                        {change.body} <strong><Link to={change.relativeUrl}>{change.linkText}</Link></strong>
                    </p>         
                </div>
    }; // ChangeLogItemBody

    const ChangeLogItemHeader = ( { change } ) => {

        const changeMonthText = getChangeMonthText( change.date );
        const changeDateText = getChangeDateText(change.date);

        return <div className="govuk-body-s govuk-!-margin-top-0">
                    
                    <div className="govuk-body-s govuk-!-margin-top-0">
                        <p className="govuk-body-m govuk-!-margin-top-0">
                            <strong>{changeMonthText}</strong>
                        </p>
                    </div>

                    {changeDateText &&
                        <div className="govuk-body-s govuk-!-margin-top-0">
                            <p className="govuk-body-s govuk-!-margin-top-0">
                                {formatDate(changeDateText, "DD MMM YYYY")}
                            </p>
                        </div>
                    }
                   
            
                </div>

    }; // ChangeLogItemHeader
    
    const ChangeLogItem: ComponentType<ChangeLogItemProps> = ({ changeLogItem, index }) => {

        return  <div className="govuk-body-s govuk-!-margin-top-0">
                    <ChangeLogItemHeader change={ changeLogItem } />

                    <ChangeLogItemBody change={ changeLogItem }                                
                                                index={ index }/> 
                </div>    
    
    }; // ChangeLogItem

    const ChangeLogType = () => {
        return <FormItem aria-labelledby={ "aria-type-filter-label" }
                        aria-describedby={ "aria-type-filter-descr" }
                        width={ "two-third" }>

                    <span
                        id={ "type-filter-label" }
                        className={ "govuk-label govuk-label--s" }>
                        Type
                    </span>


                    {
                        Object.keys(metricStates).map((key, index) => {
                        
                            return <div aria-describedby={ "type-filter-descr" }
                                        aria-labelledby={ "type-filter-label" }>
                                <label htmlFor={ "changeMetric" }>
                                    <input
                                        key={index}
                                        name={key}
                                        type="checkbox"
                                        checked={changeLogType[key]}
                                        onChange={(type) =>
                                            setChangeLogType({...changeLogType, [key]: !changeLogType[key] }) }/>
                                        {data.type[key]}
                                </label>
                            </div>

                            })
                            
                        }
                    
                </FormItem>
    }; // ChangeLogType

    const filterByDate = (item) => {

        const today = moment(timestamp).local(true).toDate().getTime();
        const changeDate = new Date(item.date).getTime();

        if (changeDate <= today) {
            return true;
        } else {
            return false;
        }

    }; // filterByDate

    const filterByType = (item) => {
        const keys = Object.keys(metricStates).filter(key => changeLogType[key]);
        return Object.values(keys).some((key) => data.type[key] === item.type);    
    }; // filterByType 

    const filterBySearch = (search) => {
        const pattern = new RegExp(changeLogSearch.toLowerCase());
        return pattern.exec(search.toLowerCase());
    }; // filterBySearch 

    const isTypeSet = () => {
        return Object.keys(metricStates).some((key) => changeLogType[key]) 
    } // isTypeSet

    const filterData = (item) => {
        
        const match1 = filterByDate(item)

        const typeSet = isTypeSet();
        
        let match2 = true
         if (typeSet) {
            match2 = filterByType(item);
        }
        
        let match3 = true
        if (changeLogSearch) {
            match3 = filterBySearch(item.body);
        } 

        return match1 && match2 && match3

    }; // filterData


    // reverse sort
    const sortData = (a, b) => {
        const
            dateA = new Date(a.date),
            dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();

    }; // sortData

    // assumes data is sorted in reverse date order
    const getChangeMonthText = (changeDate) => {

        const dte = new Date(changeDate);
        const changeMonth = "" + dte.getMonth() + dte.getFullYear();
        
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
        
    }; // getChangeMonthText

     // assumes data is sorted in reverse date order
     const getChangeDateText = (date) => {

        if (changeDateRef.current && changeDateRef.current !== date) {
            changeDateRef.current = date;
            return date
        } 

        if (changeDateRef.current !== date) {
            changeDateRef.current = date;
            return date
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
        
                <div id={ "filterChangeLogItem" } className={ "govuk-!-margin-top-1" }>
                    {
                        data && data["changeLog"].filter(filterData).sort(sortData).map((change, index) => { 
                            return<ChangeLogItem 
                                key={index}
                                index={ index }
                                changeLogItem={change}/>           
                    })}  
                </div>         
    
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

                        <ChangeLogType/>
                        
                    </Form>
                </div>      
            </SideContent>
        </Container>
    </>
};

export default ChangeLogComponent;