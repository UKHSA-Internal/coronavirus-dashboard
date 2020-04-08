import React, { Component } from 'react';

import { Container, Paragraph } from "./Export.styles";
import { downloadAsCSV, formatDateAsUTC } from "./Export.utils";
import type { ExportAsCSVProps, DataInterface } from "./Export.types";


/**
 * Export CSV
 *
 * Produces a link that when clicked, triggers the process to generated and
 * download a CSV file containing the data obtained from the hook.
 *
 * Properties
 * ----------
 * @param filename {string}    Name of the CSV file. [default: "data"]
 * @param linkText {string}    Text to be shown for the download link.
 *                             [default: "Download data as CSV"]
 * @param data {DataInterface} Completed dataset, as downloaded from the server.
 */
export default class ExportAsCSV extends Component<ExportAsCSVProps, {}> {

    // Default substitutes.
    defaultFileName = 'coronavirus-data';
    defaultLinkText = 'Download data as CSV';

    // PRIVATE: Index at which the date value is stored in each row.
    // Also represents the index after which numeric data start in each row.
    // Index: [0        , 1        , 2        , 3   , ...             ]
    // Data:  [Area Name, Area Code, Area Type, Date, ...numeric data ]
    #dateIndex = 3;

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

        // Preventing the URL click event from triggering.
        // The download event is triggered programmatically via `downloadAsCSV`.
        event.preventDefault();

        const
            // Extracting data from the props.
            {
                fileName=this.defaultFileName,
                data: {
                    overview={},
                    countries={},
                    regions={},
                    utlas={}
                }
            } = this.props,

            // Constructing the JSON with categorical values.
            data = {
                // Categorical value for area name: column data (JSON dataset)
                Country: countries,
                "Country - UK": overview,
                Region: regions,
                "Upper tier local authority": utlas
            };

        downloadAsCSV({
            csv:
                Object.keys(data)
                    // Converting each JSON dataset to a 2D array.
                    .map(areaType => this.format(data[areaType], areaType))
                    // Concatenating all 2D arrays.
                    .reduce((accum, val) => accum.concat(val))
                    // Sorting by data (descending).
                    .sort((a, b) => new Date(b[this.#dateIndex]) - new Date(a[this.#dateIndex])),

            fileName: fileName,

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
    format(content: any, areaType: string): Array<Array<string|number|null>> | null {

        if ( Object.keys(content).length < 1 ) return null;

        // Placeholder array for numeric values.
        const placeholder = Object.keys(this.categoryNames).map(() => null);

        let
            results: Array<Array<string>> = [],
            index: number = 0,
            countryData = {},
            name: string,
            countryResult = {};

        // Going through each key in JSON data.
        for ( const areaCode in content ) {
            // If the key is ignored, move on.
            if ( !content.hasOwnProperty(areaCode) || this.ignoredFields.indexOf(areaCode) > -1 ) continue;

            name = content[areaCode].name.value;
            countryData = content[areaCode];
            countryResult = {};
            index = this.#dateIndex;

            for ( const column in this.categoryNames ) {
                // If the column name doesn't exist in countryData, move on.
                if ( !countryData.hasOwnProperty(column) || this.ignoredColumns.indexOf(column) > -1 ) continue;

                index++;

                // Going through the array of items in the current column.
                // This is to ensure that we write at the same index for each column
                // each time we switch columns in the previous iteration.
                for ( const item of countryData[column] ) {
                    // If the data does no exist in countryResult, add it.
                    // The data will include the name, area code, area type, date, and placeholders.
                    if ( !countryResult.hasOwnProperty(item.date) )
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
