/**
 * CSV Export Service for the GOV.UK dashboard.
 *
 * The service is intended to convert JSON data onto a CSV file, to be downloaded
 * upon request by the end user.
 *
 * Author:        Pouria Hadjibagheri <pouria.hadjibagheri@phe.gov.uk>
 * Created:       3 April 2020
 * License:       Open Government License v3.0
 * Contributors:  Pouria Hadjibagheri
 * Last update:   7 April 2020
 */

import React, { Component } from 'react';

import { Container, Paragraph } from "./Export.styles";
import { downloadAsCSV, formatDateAsUTC } from "./Export.utils";
import type { ExportAsCSVProps } from "./Export.types";


/**
 * Export CSV
 *
 * Produces a link that when clicked, triggers the process to generated and
 * download a CSV file containing the data obtained from the hook.
 *
 * Properties
 * ----------
 * @param filename
 * @param linkText
 * @param data
 * @param lastUpdate
 */
export default class ExportAsCSV extends Component<Props, ExportAsCSVProps> {

    defaultFileName = 'data';
    defaultLinkText = 'Download data as CSV';
    categoryNames = {
        "dailyConfirmedCases": "Lab-confirmed cases",
        "dailyTotalConfirmedCases": "Cumulative lab-confirmed cases",
        "dailyDeaths": "Daily hospital deaths",
        "dailyTotalDeaths": "Cumulative hospital deaths"
    };
    columnNames = [
        "Area name",
        "Area code",
        "Area type",
        "Date",
        "Daily lab-confirmed cases",
        "Cumulative lab-confirmed cases",
        "Daily hospital deaths",
        "Cumulative hospital deaths"
    ];
    ignoredColumns = [
        "name",
        "date"
    ];
    ignoredFields = [
        "lastUpdatedAt",
        "disclaimer",
        "totalCases",
        "deaths"
    ];

    /**
     * Retrieves data from the hook, constructs a CSV blob
     * and triggers the download.
     */
    download = (event: React.MouseEvent<HTMLAnchorElement>): null => {

        event.preventDefault();

        const
            [overviewData={}, countryData={}, nhsRegionData={}, localAuthorityData={}] = this.props.data,
            { lastUpdate="", fileName=this.defaultFileName } = this.props,
            dateIndex = 3,
            data = {
                // Categorical value for area name: column data (JSON dataset)
                Country: countryData,
                "Country - UK": overviewData,
                Region: nhsRegionData,
                "Upper tier local authority": localAuthorityData
            };

        let outputName = lastUpdate === ""
            ? fileName
            : `${fileName}_${formatDateAsUTC(new Date(lastUpdate))}`;

        downloadAsCSV({
            csv:
                Object.keys(data)
                    // Converting each JSON dataset to a 2D array.
                    .map(areaType => this.format(data[areaType], areaType))
                    // Concatenating all 2D arrays.
                    .reduce((accum, val) => accum.concat(val))
                    // Sorting by data (descending).
                    .sort((a, b) => new Date(b[dateIndex]) - new Date(a[dateIndex])),
            fileName: outputName,
            headings: this.columnNames
        });

    }; // getData

    /**
     * Formats the data from JSON to a nested array based on the
     * rules defined in the following class properties:
     *
     * - categoryNames
     * - columnNames
     * - ignoredColumns
     * - ignoredFields
     */
    format(content: any, areaType: string): string|null {

        if (Object.keys(content).length < 1) return null;

        const
            // [0        , 1        , 2        , 3   , ...]
            // [Area Name, Area Code, Area Type, Date, ... ]
            startingIndex: number = 3,
            // Placeholder array for numeric values.
            placeholder = Object.keys(this.categoryNames).map(() => null);

        let
            results: Array<Array<string>> = [],
            index: number = 0,
            countryData = {},
            name: string,
            countryResult = {};

        // Going through each key in JSON data.
        for (const areaCode in content) {
            // If the key is ignored, move on.
            if (!content.hasOwnProperty(areaCode) || this.ignoredFields.indexOf(areaCode) > -1) continue;

            name = content[areaCode].name.value;
            countryData = content[areaCode];
            countryResult = {};
            index = startingIndex;

            for (const column in this.categoryNames) {
                // If the column name doesn't exist in countryData, move on.
                if (!countryData.hasOwnProperty(column) || this.ignoredColumns.indexOf(column) > -1) continue;

                index++;

                // Going through the array of items in the current column.
                // This is to ensure that we write at the same index for each column
                // each time we switch columns in the previous iteration.
                for (const item of countryData[column]) {
                    // If the data does no exist in countryResult, add it.
                    // The data will include the name, area code, area type, date, and placeholders.
                    if (!countryResult.hasOwnProperty(item.date))
                        countryResult[item.date] = [name, areaCode, areaType, item.date, ...placeholder];

                    countryResult[item.date][index] = item.value;
                } // for item:countryData[column]

            } // for column:this.categoryNames

            results = results.concat(Object.keys(countryResult).map(key => countryResult[key]))

        } // for countryCode:content

        return results

    } // format

    /**
     * Rendering an anchor link to trigger the download.
     */
    render(): any {

        const { linkText = this.defaultLinkText} = this.props;

        return <Container>
            <Paragraph>
                <a href={ '#' }
                   className={ "govuk-link" }
                   onClick={ this.download }>{ linkText }</a>
            </Paragraph>
        </Container>

    } // render

} // ExportAsCSV
