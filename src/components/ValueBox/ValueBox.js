// @flow

import React from "react";

import { analytics, colours, strFormat } from "common/utils";
import {
    DataColour,
    DataContainer,
    DataNumbersContainer,
    Heading,
    DataLabel,
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


const ValueItem: ComponentType<ValueItemType> = ({ heading, label, value, params,
                                                     embedded, tooltip=null, sign=null }) => {

    const
        preppedLabel = `value-item_${heading}-${label}`.replace(/\s/g, "_"),
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
        { label && <DataLabel embedded={ embedded }>{ label }</DataLabel> }
        <Number>
            <ModalTooltip data-tip={ formattedTooltip }
                          data-for={ tipId }
                          aria-describedby={ `${preppedLabel}-description` }
                          aria-label={ `${ heading }: ${ label }` }
                          markdownPath={ value }
                          replacements={ replacements }>
                {
                    data !== null
                        ? (data?.length ?? 0) > 0
                        ? numeral(data[0].value).format("0,0")
                        : <NotAvailable/>
                        : <Loading/>
                }{ (data && sign) ? sign : null }
                <span id={ `${preppedLabel}-description` }
                      className={ "govuk-visually-hidden" }>
                    Abstract information: { formattedTooltip }.<br/>
                    Click for additional details.
                </span>
            </ModalTooltip>
        </Number>
        <ReactTooltip id={ tipId }
                      place={ "right" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </NumericData>

}; // ValueItem


const ValueBox: ComponentType<*> = ({ heading, caption, valueItems, embedded=false, ...rest }) => {

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
                                  ${ caption.toLowerCase() }" on the graph.`
                              }
                              onClick={ chartToggleCallback }
                              colour={ isEnabled ? (colours?.[chart.colour] ?? "") : "none" }>
                    <span className={ "govuk-visually-hidden" }>
                        Click to { isEnabled ? "hide" : "show" }
                        "{ caption.toLowerCase() }" on the graph.
                    </span>
                </DataColour>
        }
        <Heading embedded={ embedded }>{ caption }</Heading>
        <DataNumbersContainer>{
            valueItems.map((item, index) =>
                item.value &&
                <ValueItem key={ `value-item-${ index }` }
                           value={ item.value }
                           label={ item.label }
                           tooltip={ item.tooltip }
                           sign={ item.sign }
                           heading={ heading }
                           embedded={ embedded }
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
