import React, { Component, S, SS } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import useResponsiveLayout from "hooks/useResponsiveLayout";

import * as utils from "./utils";
import * as Styles from "./MapTable.styles";
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

    return headings.map(({ getter, format }, index) => {

        const
            value = getter(data),
            valueId = utils.prepAsKey(value),
            parsedHash = utils.getParams(hash),
            hashPrepped = utils.createHash({category: parsedHash.category, map: parsedHash.map, area: valueId});

            return <td key={ `cell-${ index }` }
                       className={ `govuk-table__cell govuk-table__cell--${ format }` }>
                {
                    (index === 0 && valueId !== (parsedHash?.area ?? ""))
                        ? <LinkOrText

                            id={ hashPrepped.substring(1) }
                            // onClick={handleOnCountryClick(r)}
                            // onKeyPress={handleOnCountryKeyDown}
                            hash={ hashPrepped }
                            // active={ hash === hashPrepped }
                        >
                            { getter(data) }
                        </LinkOrText>
                        : getter(data)
                }
            </td>
        }
    )

}; // Td


export class Table extends Component<TableProps, {}> {

    #baseUrl = 'https://c19downloads.azureedge.net/downloads/data/';
    #excluded = [
        "metadata"
    ]

    state: TableState = {
        loading: true,
        data: null,
        populationData: null
    }

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

    componentDidUpdate(prevProps: Readonly<TableProps>, prevState: Readonly<TableState>, snapshot: SS): void {

        const
            { hash } = this.props,
            prevHash = utils.getParams(prevProps.hash),
            newHash = utils.getParams(hash);

        if ( prevHash.category !== newHash.category && this.props.data ) {

            this.setState({data: this.props.data})

        } else if ( prevHash.category !== newHash.category && !this.props.data ) {

            this.setState({ loading: true }, this.getData)

        }

    } // componentDidUpdate

    render(): React.ReactNode {

        const
            { loading, data } = this.state,
            { headings = [], hash=null, populationData } = this.props;

        if ( loading || !hash || !populationData  || !data ) return <Styles.P>Loading...</Styles.P>

        return <table className={ 'govuk-table' }>
            <thead className={ 'govuk-table__head' }>
                <tr className={ 'govuk-table__row' }>
                    {
                        headings.map((heading, index) =>
                            <th key={ `heading-${ index }` }
                                scope={ "col" }
                                className={ `govuk-table__header govuk-table__header--${ heading.format }` }>
                                { heading.label }
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody className={ 'govuk-table__body' }>
            {
                data.values.map(item =>
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