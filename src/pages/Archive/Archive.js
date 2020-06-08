import React, { Component, Fragment } from "react";

import axios from "axios";
import { transpose } from "d3-array";
import moment from "moment";
import { Link } from 'react-router-dom';

import URLs from "common/urls";

import PageTitle from 'components/PageTitle';
import type {
    ArchiveData,
    ArchiveState,
    ArchiveProps,
    DateGroupedArchiveData,
    RegExExtractArchiveData
} from "./Archive.types"

import {
    BodyCell,
    Tag,
    DownloadLink,
    Loading,
    Table,
    TableContainer,
    HeadCell,
    TextContainer
} from "./Archive.styles";



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
        <BodyCell>
            { moment(cellData[0].date).format("ddd, DD MMM YYYY") }&nbsp;
            {
                isFirst
                    ? <Tag>Latest</Tag>
                    : null
            }
        </BodyCell>
        {
            cellData.map(d =>
                <BodyCell key={ `${d.date}_${d.category}_${d.format}` }>
                    <DownloadLink href={ `/downloads/${d.url}` }
                       download={ `coronavirus-${d.category}_${d.date}.${d.format}` }>
                        { capitalize(d.category) } as { d.format.toUpperCase() }
                    </DownloadLink>
                </BodyCell>
            )
        }
    </Fragment>

} // getTableCells


export default class Archive extends Component<ArchiveProps, {}> {

    #url = URLs.archiveList

    state: ArchiveState = {
        loading: false,
        data: []
    };

    getData = async () => {

        const
            { data } = await axios.get(this.#url, { responseType: 'document' }),
            nameParser = /^(\w+)\/dated\/coronavirus-(\w+)_(\d{4})(\d{2})(\d{2}).*$/,
            contents = getSortedPaths(
                data.evaluate(`//Blob/Name[starts-with(text(), 'json/dated/coronavirus-cases')]`,
                    data, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null
                ), 'json')
                .reduce(
                    (acc: Array<Array<string>, Array<string>>, item: string) => {

                        const deaths = item.replace(/cases/g, "deaths")

                        acc = [
                            ...acc,
                            item.replace(/json/g, "csv"),
                            deaths.replace(/json/g, "csv"),
                            item,
                            deaths
                        ]

                        return acc

                    }, [])
                .map(item => nameParser.exec(item));

        this.setState({
            data: groupByDate([contents]),
            loading: false
        })

    }; // getList

    componentDidMount(): void {

        this.setState({loading: true}, this.getData)

        // ToDo: This should be done for every page in the "app.js".
        const base = document.querySelector("head>base");
        base.href = document.location.pathname;

    } // componentDidMount

    display() {

        const { loading, data } = this.state;

        if ( loading ) return <Loading>Loading&hellip;</Loading>

        return <TableContainer>
            <Table>
                <thead className={ "govuk-table__head" }>
                    <tr className={ "govuk-table__row" }>
                        <HeadCell scope={ "col" }>Date</HeadCell>
                        <HeadCell colSpan={ 4 }>Downloads</HeadCell>
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

        return <Fragment>
            <PageTitle title={"Archive"} />
            <TextContainer>
                <p className={ "govuk-body" }>
                    This page provides links to data previously published on the dashboard. These files include data that have been superseded because errors have been found.  For corrected up-to-date series of daily data, use the “latest” downloads below.
                </p>
                <p className={ "govuk-body" }>
                    Files for deaths dated 28 April 2020 and earlier include the data for England based only on hospital deaths reported by NHS England. Files dated 29 April 2020 onwards include deaths for England calculated by PHE from multiple sources. See the <Link to={ "/about" } className={ "govuk-link govuk-link--no-visited-state" }>About the data</Link> for details.
                </p>
            </TextContainer>

            { this.display() }
        </Fragment>

    } // render

} // Archive
