import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import { CaretUp, CaretDown, CaretUpDown } from "common/Icons";
import useResponsiveLayout from "hooks/useResponsiveLayout";

import * as utils from "./utils";
import { P, TableHeadingCell, Sort } from "./MapTable.styles";
import type {
    TableState,
    TableProps
} from "./MapTable.types"


const LinkOrText = ({ children, hash, ...props }) => {

    const layout = useResponsiveLayout(768);

    return layout === 'desktop'
        ? <Link { ...props }
                role={ "button" }
                tabIndex={ 0 }
                to={ hash }
                className={ "govuk-link govuk-link--no-visited-state" }>
            { children }
        </Link>
        : <span { ...props }>{ children }</span>;

};


const Td = ({ headings, hash, data }) => {

    return headings.map(({ getter, format, keyGetter=getter }, index) => {

        const
            key = keyGetter(data),
            keyId = utils.prepAsKey(key),
            parsedHash = utils.getParams(hash),
            hashPrepped = utils.createHash({
                category: parsedHash.category,
                map: parsedHash.map,
                area: keyId
            });

            return <td key={ `cell-${ keyId }` }
                       className={ `govuk-table__cell govuk-table__cell--${ format }` }>
                {
                    (index === 0 && keyId !== (parsedHash?.area ?? ""))
                        ? <LinkOrText id={ hashPrepped.substring(1) }
                                      hash={ hashPrepped }>
                            { getter(data) }
                        </LinkOrText>
                        : getter(data)
                }
            </td>
        }
    )

}; // Td


const SortIcon = ({ headingId, sortBy, updater }) => {

    const direction = sortBy.field !== headingId || !sortBy.ascending;

    return <Sort href={ "" } role={ "button" } onClick={ event => updater(event, headingId, direction) }>
        { sortBy.field !== headingId
            ? <CaretUpDown/>
            : direction ? <CaretUp/> : <CaretDown/> }
    </Sort>

}; // SortIcon


export class Table extends Component<TableProps, {}> {

    #baseUrl = 'https://c19downloads.azureedge.net/downloads/data/';
    #excluded = [
        "metadata"
    ]

    state: TableState = {
        loading: true,
        data: null,
        populationData: null
    } // state

    getData = async () => {

        const { url, dataSetter, populationData, data: dt = null } = this.props;

        let data = dt;

        if (!dt) {

            const response = await axios.get(url, { baseURL: this.#baseUrl });

            data = response.data

            for ( const key of this.#excluded ) delete data[key];

            data = new utils.Data(data, populationData)

        }

        this.setState({
            data: data,
            loading: false
        }, () => dataSetter(data))

    }; // getData

    componentDidMount(): void {

        this.setState({ loading: true }, this.getData)

    } // componentDidMount

    componentDidUpdate(prevProps: Readonly<TableProps>, prevState: Readonly<TableState>, snapshot: any): void {

        const
            { hash: thisHash,  data } = this.props,
            { hash: prevHash } = prevProps,
            lastHash = utils.getParams(prevHash),
            newHash = utils.getParams(thisHash);

        if ( lastHash.category !== newHash.category && data ) {

            this.setState({data: data})

        } else if ( lastHash.category !== newHash.category && !data ) {

            this.setState({ loading: true }, this.getData)

        }

    } // componentDidUpdate

    render(): React.ReactNode {

        const
            { loading, data } = this.state,
            {
                headings=[],
                hash=null,
                populationData,
                sortBy,
                sortUpdate,
            } = this.props,
            ascending = sortBy.ascending ? 1 : -1;

        if ( loading || !hash || !populationData  || !data ) return <P>Loading...</P>

        const sortFunc = ({ [sortBy.field]: a }, { [sortBy.field]: b }) => {
            a = a?.value ?? a;
            b = b?.value ?? b;
            return ((a > b) || -((a < b) || 0)) * ascending
        };
        const dt = [...data.values].sort(sortFunc)

        return <table className={ 'govuk-table' }>
            <thead className={ 'govuk-table__head' }>
                <tr className={ 'govuk-table__row' }>
                    {
                        headings.map(({ id, format, label }, index) =>
                            <th key={ `heading-${ id }-${ index }` }
                                scope={ "col" }
                                id={ id }
                                className={ `govuk-table__header govuk-table__header--${ format }` }>
                                <TableHeadingCell className={ format }>
                                    { label }
                                    <SortIcon headingId={ id }
                                              sortBy={ sortBy }
                                              updater={ sortUpdate }/>
                                </TableHeadingCell>
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody className={ 'govuk-table__body' }>
            {
                dt.map(item =>
                    <tr key={ `row-${ item.key }` } className={ 'govuk-table__row' }>
                        <Td headings={ headings }
                            data={ item }
                            hash={ hash }/>
                    </tr>
                )
            }
            </tbody>
        </table>

    } // render

} // Table