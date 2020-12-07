// @flow

import React, { useState, useRef, useEffect } from 'react';

import useTimestamp from 'hooks/useTimestamp';

import { renderToString } from 'react-dom/server'

import { formatDate } from "react-day-picker/moment";

import moment from "moment";

import FormItem, { Form } from "components/Formset";

import {
    Container,
    MainContent,
    SideContent,
    ChangeMonthContainer,
    Markdown,
    ChangeLogSpan,
    ChangeLogAnchor,
} from './ChangeLogComponent.styles';

const THIS_MONTH_TEXT = "This month";

const today = new Date();

const THIS_MONTH = "" +  today.getMonth() + today.getFullYear();

const ChangeLogComponent = ( { data, changeTypes={} }) => {

    const changeMonthRef = useRef(null);
    const changeDateRef = useRef(null);

    const timestamp = useTimestamp();

    const [changeLogType, setChangeLogType] = useState({});
    const [changeLogSearch, setChangeLogSearch] = useState("");

    useEffect(() => {

        setChangeLogType(changeTypes)
    
    }, []);

    const filterByDate = (item) => {

        const today = moment(timestamp).local(true).toDate().getTime();
        const changeDate = new Date(item.date).getTime();
        return changeDate <= today ? true : false; 

    }; // filterByDate

    const filterByType = (item) => {

        const keys = Object.keys(changeLogType).filter(key => changeLogType[key]);
        return Object.values(keys).some((key) => data.type[key] === item.type);   

    }; // filterByType 

    const filterBySearch = (body, headline) => {

        if (!body && !headline) return false;

        const pattern = new RegExp(changeLogSearch.toLowerCase());
        
        let match1 = true;
        if (body) {
            match1 = pattern.exec(body.toLowerCase());
        }

        let match2 = true;
        if (headline) {
            match2 = pattern.exec(headline.toLowerCase());
        }
        
        return match1 &&  match2;

    }; // filterBySearch 

    const isTypeSet = () => {

        return Object.keys(changeLogType).some((key) => changeLogType[key]);

    } // isTypeSet

    const filterData = (item) => {
        
        const match1 = filterByDate(item);
        if (!match1) return false;

        const typeSet = isTypeSet();

         if (typeSet) {
            const match2 = filterByType(item);
            if (!match2) return false;
        }
        
        if (changeLogSearch) {
            const match3 = filterBySearch(item.body, item.headline);
            if (!match3) return false;
        } 

        return true;

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
            return THIS_MONTH_TEXT;
        }

        if ( changeMonthRef.current !== changeMonth) {
            changeMonthRef.current = changeMonth;
            return new Date(changeDate).toLocaleString('default', { month: 'long' });
        }
        
        return null;
        
    }; // getChangeMonthText

     // assumes data is sorted in reverse date order
     const getChangeDateText = (date) => {

        if (changeDateRef.current && changeDateRef.current !== date) {
            changeDateRef.current = date;
            return date;
        } 

        if (changeDateRef.current !== date) {
            changeDateRef.current = date;
            return date;
        }
        
        return null;
        
    }; // getChangeDateText


    const ChangeLogItemBody = ({ change }) => {

        const bgColour = (data.colours.find(element => element.type === change.type) || {}).background || "inherit";
        const textColour = (data.colours.find(element => element.type === change.type) || {}).text || "#000000";
        const lnk = renderToString(<strong><ChangeLogAnchor href={change.relativeUrl}>{change.linkText}
                                    </ChangeLogAnchor></strong>);

        return  <div className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0">

                        <div className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0">
                            <strong>{change.headline}</strong>
                            <ChangeLogSpan color={textColour}
                                        bgColor={bgColour}>
                                {change.type}
                            </ChangeLogSpan>
                        </div>
                    
                        <Markdown className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0" 
                                  dangerouslySetInnerHTML={{ __html: change.body + "\u00a0" + lnk }}/>
                </div>
    }; // ChangeLogItemBody

    const ChangeLogItemHeader = ( { change } ) => {

        const changeMonthText = getChangeMonthText( change.date );
        const changeDateText = getChangeDateText( change.date );

        return <div className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0">
                    
                    {
                        changeMonthText ? 
                            <ChangeMonthContainer className="govuk-body govuk-!-margin-top-0 govuk-!-margin-bottom-0">
                                <p>
                                    <strong>{ changeMonthText }</strong>
                                </p>
                            </ChangeMonthContainer>
                    :   <p>
                            <strong>{ changeMonthText }</strong>
                        </p>
                    }

                    {changeDateText &&
                        <div className="govuk-body-s govuk-!-margin-top-0">
                            <p className="govuk-body-s govuk-!-margin-top-0">
                                {formatDate(changeDateText, "DD MMM YYYY")}
                            </p>
                        </div>
                    }
                   
            
                </div>

    }; // ChangeLogItemHeader
    
    const ChangeLogItem = ({ change, index }) => {

        const id = Object.keys(data.type).filter(key => data.type[key] === change.type) + "-" + index;

        return  <div id={ id } className="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-0">

                    <ChangeLogItemHeader change={ change }/>
                                        

                    <ChangeLogItemBody change={ change }/>
                                                                        
                </div>    
    
    }; // ChangeLogItem

    const ChangeLogType = () => {
        return <FormItem aria-labelledby={ "aria-type-filter-label" }
                        aria-describedby={ "aria-type-filter-descr" }
                        width={ "full" }>

                    <span
                        id={ "type-filter-label" }
                        className={ "govuk-label govuk-label--s" }>
                        Type
                    </span>


                    {
                        data.type && Object.keys(data.type).map((key, index) => {

                            return <div aria-describedby={ "type-filter-descr" }
                                        aria-labelledby={ "type-filter-label" }
                                        className="govuk-!-margin-bottom-1">
                                <label htmlFor={ key }>
                                    <input
                                        id={ `type-filter-${index}` }
                                        key={ `type-filter-${index}` }
                                        name={key}
                                        type="checkbox"
                                        checked={changeLogType[key]}
                                        onChange={(type) =>
                                            setChangeLogType( {...changeLogType, [key]: !changeLogType[key] }) }/>
                                        {
                                            data.type[key] &&
                                             data.type[key][0].toUpperCase() + data.type[key].slice(1).toLowerCase()
                                        }
                                </label>
                            </div>

                            })
                            
                        }
                    
                </FormItem>
    }; // ChangeLogType

    const ChangeLogTextSearch = () => {

        const inputRef = useRef();

        useEffect(() => {
            if (changeLogSearch) inputRef.current.focus();
        }, [ changeLogSearch ]);

        return <FormItem aria-labelledby={ "aria-search-filter-label" }
                        aria-describedby={ "aria-search-filter-descr" }
                        width={ "full" }>
                    <span
                        id={ "search-filter-label" }
                        className={ "govuk-label govuk-label--s" }>
                        Search
                    </span>

                    <div aria-describedby={ "search-filter-descr" }
                         aria-labelledby={ "search-filter-label" }>
                        <input 
                            id={ "search-filter-id" }
                            value={ changeLogSearch }
                            ref={inputRef}
                            className={ "govuk-input govuk-input--width-10" }
                            type={ "text" }
                            onChange={ (item) => setChangeLogSearch(item.target.value) }/>
                    </div>
                </FormItem>

    }; // ChangeLogTextSearch

    
    return <>

        <Container>
            <MainContent className={ "no-border" }>

                <p className={ "govuk-body govuk-!-margin-top-1 govuk-!-margin-bottom-0" }>
                    We regularly update the dashboard with new data and features.
                    Here&#39;s a timeline of changes.
                </p>
        
                <div className={ "govuk-!-margin-top-1" }>
                    { 
                        data.changeLog && data.changeLog.filter(filterData).sort(sortData).map((change, index) => { 
                            return<ChangeLogItem id={ `cl-item-${index}` }
                                                 key={ `cl-item-${index}` }
                                                 index={ index }
                                                 change={change}/>           
                    })}  
                </div>         
    
            </MainContent>

            <SideContent>
                <h2 className={ "govuk-heading-s govuk-!-margin-top-3 govuk-!-margin-bottom-3" }>
                    Filter
                </h2>
            
                <div className={ "govuk-!-margin-top-1" }>

                    <Form className={ "govuk-!-padding-left-0 govuk-!-padding-right-5" }>

                        <ChangeLogTextSearch/>

                        <ChangeLogType/>
                        
                    </Form>
                </div>      
            </SideContent>
        </Container>
    </>
}; //ChangeLogComponent

export default ChangeLogComponent;