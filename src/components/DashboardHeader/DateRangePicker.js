// @flow
import React, { useState } from "react";
import { useHistory } from "react-router";

import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
    formatDate,
    parseDate
} from "react-day-picker/moment";
import moment from "moment";

import type { Props } from "./DashboardHeader.types";
import { createQuery, getParams } from "common/utils";


const DatePicker = ({ baseDate = '', ...props }: Props) => {

    return <DayPickerInput
        formatDate={ formatDate }
        parseDate={ parseDate }
        placeholder={ `${ formatDate(new Date(baseDate), 'DD/MM/YYYY', 'en-gb') }` }
        format={ "DD/MM/YYYY" }
        dayPickerProps={ {
            locale: 'en-gb',
            localeUtils: MomentLocaleUtils,
            disabledDays: [{
                before: new Date(2020, 0, 3),
                after: new Date()
            }]
        } }
        { ...props }
    />

};  // DateRangePicker


const DateRangePicker = ({ query, startDate, endDate }: Props) => {

    const
        [ fromDate, setFromDate ] = useState(startDate.format("YYYY-MM-DD")),
        [ toDate, setToDate ] = useState(endDate.format("YYYY-MM-DD")),
        history = useHistory();

    const handleSubmission = event => {

        event.preventDefault();

        const
            start = moment(fromDate).format("YYYY-MM-DD"),
            end = moment(toDate).format("YYYY-MM-DD"),
            newQuery = createQuery([
                ...getParams(query),
                {key: 'date', sign: '>', value: start},
                {key: 'date', sign: '<', value: end}
            ]);

        history.push(`${newQuery}`)

    }

    return <div id={ "datepicker" } className={ "govuk-!-margin-top-3" } style={ { display: 'block' } }>
        <form className={ "govuk-!-padding-left-5 govuk-!-padding-right-5" } onSubmit={ handleSubmission }>

            <div className="govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                <div className="govuk-grid-column-two-thirds">

                    <h4 className="govuk-heading-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                        Select a date range
                    </h4>

                </div>
            </div>
            <div className="govuk-grid-row govuk-!-margin-top-0">
                <div className="govuk-grid-column-one-quarter">
                    <div className="datepicker">
                        <div className="date govuk-form-group govuk-!-margin-bottom-0">
                            <label className="govuk-label" htmlFor="id-textbox-1">
                                From date
                            </label>
                            <DatePicker
                                baseDate={ fromDate }
                                onDayChange={ setFromDate }
                            />
                        </div>
                    </div>
                </div>

                <div className="govuk-grid-column-one-quarter">
                    <div className="datepicker">
                        <div className="date govuk-form-group govuk-!-margin-bottom-0">
                            <label className="govuk-label" htmlFor="id-textbox-2">
                                To date
                            </label>
                            <DatePicker
                                baseDate={ toDate }
                                onDayChange={ setToDate }
                            />
                        </div>
                    </div>
                </div>

                <div className="govuk-grid-column-one-quarter">
                    {/* ToDo: Needs to be implemented. */}
                    <ul className="govuk-list govuk-!-margin-bottom-0">
                        <li>
                            <a className="govuk-link" href="#">Last 7 days</a>
                        </li>
                        <li>
                            <a className="govuk-link" href="#">Last 30 days</a>
                        </li>
                        <li>
                            <a className="govuk-link" href="#">Last quarter</a>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="govuk-grid-row govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                <div className="govuk-grid-column-full">
                        <input
                            type={ "submit" }
                            className={ "govuk-button govuk-!-margin-right-1 govuk-!-margin-bottom-0" }
                            value={ "Update date range" }
                        />

                        {/* ToDo: Needs to be implemented. */}
                        <input
                            type={ "reset" }
                            className={ "govuk-button govuk-button--secondary govuk-!-margin-bottom-0" }
                            value={ "Reset to all time" }
                        />
                </div>
            </div>

        </form>

        <div className="govuk-grid-row govuk-!-margin-top-0">
            <div className="govuk-grid-column-full">
                <hr className="govuk-section-break govuk-section-break--m govuk-!-margin-top-2 govuk-!-margin-bottom-0 govuk-section-break--visible"/>
            </div>
        </div>

    </div>

};  // DateRangePicker


export default DateRangePicker
