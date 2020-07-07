// @flow

import React from "react";

import { analytics, colours, strFormat } from "common/utils";
import {
    DataColour,
    DataContainer,
    DataLabel,
    DataNumbersContainer,
    Heading,
    Number,
    NumericData
} from "./ValueBox.styles";

import ReactTooltip from "react-tooltip";
import useApi from "hooks/useApi";
import moment from "moment";
import ModalTooltip from "components/Modal";
import numeral from "numeral";
import { NotAvailable } from "components/Widgets";
import Loading from "components/Loading";

import type { ComponentType } from "react";
import type { ValueItemType } from "./ValueBox.types";


const ValueItem: ComponentType<ValueItemType> = ({ label, value, params, tooltip=null, sign=null }: ValueItemType) => {

    const
        tipId = encodeURI(`${label}-${value}`),
        data = useApi({
            conjunctiveFilters: params,
            extraParams: [
                { key: "latestBy", sign: "=", value: value }
            ],
            structure: {
                date: "date",
                value: value
            },
            defaultResponse: null
        }),
        replacements = {
            kwargs: {
                ...(data?.[0] ?? {}),
                date: moment(data?.[0]?.date ?? null).format("dddd, D MMMM YYYY")
            }
        },
        formattedTooltip = strFormat(tooltip, replacements);

    return <NumericData>
        { label && <DataLabel>{ label }</DataLabel> }
        <Number>
            <ModalTooltip data-tip={ formattedTooltip }
                          data-for={ tipId }
                          markdownPath={ value }
                          replacements={ replacements }>
                {
                    data !== null
                        ? (data?.length ?? 0) > 0
                        ? numeral(data[0].value).format("0,0")
                        : <NotAvailable/>
                        : <Loading/>
                }{ (data && sign) ? sign : null }
                <p className={ "govuk-visually-hidden" }>
                    Abstract information on { label }: { formattedTooltip }<br/>
                    Click for additional details.
                </p>
            </ModalTooltip>
        </Number>
        <ReactTooltip id={ tipId }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </NumericData>

}; // ValueItem


const ValueBox: ComponentType<*> = ({ caption, valueItems, ...rest }) => {

    const
        { chart={}, isEnabled=true, setChartState=() => null } = rest,
        tipId = encodeURI(caption);

    const chartToggleCallback = () => {
        analytics("Chart toggle", caption, isEnabled ? "ON" : "OFF" );
        setChartState();
    };

    return <DataContainer>
        {
            ( chart?.colour ?? false ) === false
                ?  null
                : <DataColour role={ "button" }
                              data-for={ tipId }
                              data-tip={
                                  `Click to ${ isEnabled ? "hide" : "show" } 
                                  the "${ caption.toLowerCase() }" on the graph.`
                              }
                              onClick={ chartToggleCallback }
                              colour={ isEnabled ? (colours?.[chart.colour] ?? "") : "none" } />
        }
        <Heading>{ caption }</Heading>
        <DataNumbersContainer>{
            valueItems.map((item, index) =>
                item.value &&
                <ValueItem key={ `value-item-${ index }` }
                           value={ item.value }
                           label={ item.label }
                           tooltip={ item.tooltip }
                           sign={ item.sign }
                           params={ rest.params }/>
            )
        }</DataNumbersContainer>
        <ReactTooltip id={ tipId }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </DataContainer>

};  // getValueItemSections


export default ValueBox;
