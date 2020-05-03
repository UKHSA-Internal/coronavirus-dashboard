import React, { Component, Fragment } from "react";

import axios from "axios";
import { transpose } from "d3-array";
import moment from "moment";
import { Link } from 'react-router-dom';

import {
    Container, DownloadLink, Table, TableContainer,
    SectionHeader, BodyCell, HeadCell
} from "./Archive.style";

import type {
    ArchiveData, ArchiveState, ArchiveProps,
    DateGroupedArchiveData, RegExExtractArchiveData
} from "./Archive.types"


const [URL, FORMAT, CATEGORY, YEAR, MONTH, DAY] = [0, 1, 2, 3, 4, 5];


const sortFunc = (a, b) => a < b ? 1 : a > b ? -1 : 0;


const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);


const getSortedPaths = (iterator) => {

    let
        data = [],
        thisNode = iterator.iterateNext();

    do {

        data.push(thisNode.textContent);
        thisNode = iterator.iterateNext();

    } while (thisNode)

    return data.sort(sortFunc);

}; // getSortedPaths


const aggregateByCategory = (data: Array<ArchiveData>, category: string, categoryKey: string="category"): Array<ArchiveData> => {

    categoryKey = categoryKey.toLowerCase();

    return data.filter(d => (d?.[categoryKey]?.toLowerCase() ?? "") === category)

}; // aggregateByCategory


const groupByDate = (data: Array<Array<RegExExtractArchiveData, RegExExtractArchiveData>>): DateGroupedArchiveData => {

    let
        contents = {}, // Stores data following aggregation by date.
        rowData, // Temp for aggregation.
        date; // Temp for current date.

    // Aggregation by date.
    for ( const row of transpose(data) ) {

        rowData = row.map(item => ({
            date: `${item[YEAR]}-${item[MONTH]}-${item[DAY]}`,
            url: item[URL],
            category: item[CATEGORY],
            format: item[FORMAT]
        }));

        date = rowData[0].date
        contents[date] = [...(contents?.[date] ?? []),  ...rowData]

    }

    return contents

}; // aggregateByDate


const getByFormat = (data: Array<ArchiveData>, format: string, formatKey: string="format"): ArchiveData => {

    format = format.toLowerCase();

    for (const item of data)
        if ( (item?.[formatKey]?.toLowerCase() ?? "") === format ) return item

}; // getByFormat


const getTableCells = (data: Array<ArchiveData>, isFirst: boolean=false) => {

    const
        deaths = aggregateByCategory(data, "deaths"),
        cases = aggregateByCategory(data, "cases"),
        cellData = [
            getByFormat(cases, "csv"),
            getByFormat(cases, "json"),
            getByFormat(deaths, "csv"),
            getByFormat(deaths, "json")
        ];

    return <Fragment>
        <BodyCell className={ `govuk-table__cell` }>
            { moment(cellData[0].date).format("ddd, DD MMM YYYY") }&nbsp;
            {
                isFirst
                    ? <strong className="govuk-tag">Latest</strong>
                    : null
            }
        </BodyCell>
        {
            cellData.map(d =>
                <BodyCell key={ `${d.date}_${d.category}_${d.format}` }
                          className={ `govuk-table__cell` }>
                    <DownloadLink href={ `/downloads/${d.url}` }
                       className={ 'govuk-link' }
                       download={ `coronavirus-${d.category}_${d.date}.${d.format}` }>
                        { capitalize(d.category) } as { d.format.toUpperCase() }
                    </DownloadLink>
                </BodyCell>
            )
        }
    </Fragment>

} // getTableCells


export default class Archive extends Component<ArchiveProps, {}> {

    #url = "https://publicdashacc.blob.core.windows.net/downloads?restype=container&comp=list"

    state: ArchiveState = {
        loading: false,
        data: []
    };

    getData = async () => {

        const
            { data } = await axios.get(this.#url, { responseType: 'document' }),
            nameParser = /^(\w+)\/dated\/coronavirus-(\w+)_(\d{4})(\d{2})(\d{2}).*$/,
            fileTypes = ["csv", "json"],
            contents = fileTypes
                .map(f => data.evaluate(
                    `//Blob/Name[starts-with(text(), '${f}/dated')]`,
                    data, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null
                ))
                .map(getSortedPaths)
                .map(item => item.map( v => nameParser.exec(v) ));

        this.setState({
            data: groupByDate(contents),
            loading: false
        })

    }; // getList

    componentDidMount(): void {

        this.setState({loading: true}, this.getData)

    } // componentDidMount

    display() {

        const { loading, data } = this.state;

        if ( loading ) return <p className={ "govuk-body" }>Loading&hellip;</p>

        return <TableContainer>
            <Table className={ "govuk-table" }>
                <thead className={ "govuk-table__head" }>
                    <tr className={ "govuk-table__row" }>
                        <HeadCell scope={ "col" } className={ "govuk-table__header app-custom-class" }>Date</HeadCell>
                        <HeadCell colSpan={ 4 } className={ "govuk-table__header app-custom-class" }>Downloads</HeadCell>
                    </tr>
                </thead>
                <tbody className={ "govuk-table__body" }>
                {
                    Object.keys(data).map((date, index) =>
                        <tr key={ `archive-${date}` }
                            className={ "govuk-table__row" }>
                            { getTableCells(data[date], index === 0) }
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </TableContainer>

    } // display

    render(): React.ReactNode {

        return <Container className={"govuk-width-container"}>
            <SectionHeader className={ "govuk-heading-l" }>
                Archive
            </SectionHeader>
            <p className={ "govuk-body" }>
                This page provides links to data previously published on the dashboard.
                These files include data that have been superseded because errors have
                been found.  For corrected up-to-date series of daily data, use the
                “latest” downloads below.
            </p>
            <p className={ "govuk-body" }>
                Files for deaths dated 28 April 2020 and earlier include the data for
                England based only on hospital deaths reported by NHS England.  Files
                dated 29 April 2020 onwards include deaths for England calculated by PHE
                from multiple sources. See the&nbsp;
                <Link to={ "/about" }
                      className={ "govuk-link govuk-link--no-visited-state" }>
                    About the data
                </Link>&nbsp;for details.
            </p>
            { this.display() }
        </Container>

    } // render

} // Archive