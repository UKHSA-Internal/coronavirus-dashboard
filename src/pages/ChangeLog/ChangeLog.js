// @flow

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import DayPickerInput from "react-day-picker/DayPickerInput";

import axios from "axios";

import moment from "moment";

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
import type { ChangeLogProps } from "./ChangeLog.types";

import useGenericAPI from 'hooks/useGenericAPI';
import useTimestamp from 'hooks/useTimestamp';

const MIN_CHANGE_LOG_DATE = Date(2020, 7, 12);

const ChangeLog: ComponentType<ChangeLogProps> = ({ ...props }) => {

    const { data } = useGenericAPI({defaultResponse: []});

    const { timestamp } = useTimestamp(),
            changeLogDateTo = moment(timestamp).local(true).subtract(1, "days").toDate();
            

    const [changeLogType, setChangeLogType] = useState('');
    const [changeLogDate, setChangeLogDate] = useState(null);

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
            return filterByType(item.body)
        } 
        else if (changeLogDate) {
            return filterByDate(item.date)
        }
        else {
            return true;
        }
    };



    if ( !data ) return <Loading/>;

    return <>

    

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
                    before: new Date(2020, 0, 3),
                    after:  new Date(changeLogDateTo.getFullYear(), 
                                     changeLogDateTo.getMonth(),
                                     changeLogDateTo.getDate())
                    }]
              }} />

        <input 
            className={ "govuk-input govuk-input--width-10" }
            type={ "text" }
            placeholder={ "Filter by type" }
            onChange={ (item) => setChangeLogType(item.target.value) }
        />
        
        <Article>
            {data.filter(filterData).map(change =>
                <div>
                    <div>
                        Date: {formatDate(change.date, "DD/MM/YYY")}
                    </div>
                    <div>
                        <Link to={change.relativeUrl}>{change.linkText}</Link>
                    </div>
                    <div>
                        <Markdown dangerouslySetInnerHTML={{ __html: change.body }}/>
                    </div>
                </div>
                
            )}
       
        </Article>
    </>
        


} // ChangeLog


export default ChangeLog;
