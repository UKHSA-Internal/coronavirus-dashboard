import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import axios from 'axios';
import numeral from "numeral";

import { Map } from "./Map";
import { Table } from "./Table";
import { Content } from "./constants";
import { RatePerPopulation } from "./constants";
import * as utils from "./utils";

import * as Styles from './MapTable.styles';

import type {
    MapTableState,
    MapTableProps
} from "./MapTable.types";


const Description = ({ text, show = true, ...props }): React.ReactNode => {

    return !show
        ? null
        : <Styles.Description { ...props }>
            { text }
        </Styles.Description>

}; // Footnote


export class MapTable extends Component<MapTableProps, {}> {

    #populationData = 'https://c19pub.azureedge.net/assets/population/population.json';

    state: MapTableState = {

        data: {},
        category: Content[0].textLabel,
        viewMapAs: "rate",
        area: "",
        populationData: null,
        geoData: null,
        loading: false,
        mapObject: null

    } // state

    getPopulationData = async (): void => {

        const { data } = await axios.get(this.#populationData);

        this.setState({ populationData: data, loading: false })

    }; // getPopulationData

    componentDidMount(): void {

        this.setState({ loading: true }, this.getPopulationData)

    } // componentDidMount

    setCategory  = (category: string): void  => {

        this.setState({ category: category })

    }; // setCategory

    tabClickHandler = (event, category) => {

        this.setCategory(category)

    }; // tabClickHandler

    render(): React.ReactNode {

        const
            {
                category = "nations",
                data,
                viewMapAs = "rate",
                populationData,
                geoData,
                loading
            } = this.state,
            { children, location, isMobile = false } = this.props,
            hash = location.hash !== ""
                ? location.hash
                : utils.createHash({category: category, map: viewMapAs}),
            parsedHash = utils.getParams(hash),
            contentData = Content.filter(item => item.textLabel === parsedHash.category)[0];

        if (loading) return <Styles.P>Loading&hellip;</Styles.P>

        return <Styles.MainContainer>
            <Styles.TabContainer>
                <div className={ "govuk-tabs" } data-module={ "govuk-tabs" }>
                    <ul className={ "govuk-tabs__list" }>
                    {
                        Content.map(({ textLabel, label }) =>
                            <li key={ `category-tab-${textLabel}` }
                                className={ `govuk-tabs__list-item ${ textLabel === parsedHash.category ? 'govuk-tabs__list-item--selected' : '' }` }>

                                <Link className={ "govuk-tabs__tab" }
                                   to={ () => `#category=${textLabel}&map=${parsedHash.map}` }
                                   onClick={ (event) => this.tabClickHandler(event, textLabel) }>
                                    { label }
                                </Link>

                            </li>
                        )
                    }
                    </ul>
                    <div className={ `govuk-tabs__panel` } id={ parsedHash.category }>
                        <Table{ ...contentData }
                              hash={ hash }
                              populationData={ populationData }
                              data={ data?.[parsedHash.category] ?? null }
                              dataSetter={ (data) => this.setState(prevState => ({
                                  data: {
                                      ...prevState.data,
                                      [parsedHash.category]: data
                                  }
                              })) }
                        />

                    </div>
                </div>
            </Styles.TabContainer>

            <Styles.ChildrenContainer>
                <Description
                    text={ `Rates per ${ numeral(RatePerPopulation).format("0,0") } resident population.` }
                />
                { children }
            </Styles.ChildrenContainer>

            { isMobile
                ? null
                : <Styles.MapViewOption>
                    <Styles.TabContainer>
                        <div className={ "govuk-tabs" } data-module={ "govuk-tabs" }>
                            <ul className="govuk-tabs__list">
                                <li className={ `govuk-tabs__list-item ${ parsedHash.map === "rate" ? 'govuk-tabs__list-item--selected' : '' }` }>
                                    <Link className={ "govuk-tabs__tab" }
                                          to={ `#category=${ category }&map=rate` }
                                          onClick={ () => this.setState({ viewMapAs: "rate" }) }>
                                        { "Rate" }
                                    </Link>
                                </li>
                                <li className={ `govuk-tabs__list-item ${ parsedHash.map === "case" ? 'govuk-tabs__list-item--selected' : '' }` }>
                                    <Link className={ "govuk-tabs__tab" }
                                          to={ `#category=${ parsedHash.category }&map=case` }
                                          onClick={ () => this.setState({ viewMapAs: "case" }) }>
                                        { "Total cases" }
                                    </Link>
                                </li>
                                <li>
                                    <Description
                                        className={ "above" }
                                        show={ parsedHash.map === "rate" }
                                        text={ "Areas with darker shading have higher rates." }
                                    />
                                </li>
                            </ul>
                            <div className={ `govuk-tabs__panel` }>
                                <Map { ...contentData }
                                     data={ data?.[parsedHash.category] ?? null }
                                     hash={ hash }
                                     geoData={ geoData?.[parsedHash.category] ?? null }
                                     isRate={ parsedHash.map === "rate" }
                                     mapObjectSetter={ () => this.mapObjectSetter() }
                                     geoDataSetter={ data => this.setState(prevState => ({
                                         geoData: {
                                             ...prevState.geoData,
                                             [parsedHash.category]: data
                                         }
                                     })) }/>
                            </div>
                        </div>
                    </Styles.TabContainer>
                </Styles.MapViewOption>
            }
        </Styles.MainContainer>


    } // render

} // MapTable


export default withRouter(MapTable)
