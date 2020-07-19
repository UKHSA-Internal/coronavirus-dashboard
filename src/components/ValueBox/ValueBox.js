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


const ValueItem: ComponentType<ValueItemType> = ({ heading, label, value, params, order=0,
                                                     embedded, tooltip=null, sign=null }) => {

    const
        preppedLabel = `value-item-${heading}-${label}-${ value }-${ order }`
            .toLowerCase()
            .replace(/[\s:]/g, "_"),
        tipId = `${ preppedLabel }_tooltip`,
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
        dataAvailable = (data?.length ?? 0) > 0,
        replacements = {
            kwargs: {
                ...(data?.[0] ?? {}),
                date: dataAvailable
                    ? moment(data?.[0]?.date ?? null)
                        .format("dddd, D MMMM YYYY")
                    : "(where available) the day of the latest update"
            }
        },
        formattedTooltip = strFormat(tooltip, replacements),
        noDataMsg = "Data not currently available for this metric";

    return <NumericData>
        {
            label &&
            <DataLabel embedded={ embedded }>{ label }</DataLabel>
        }
        <Number>
            <ModalTooltip data-tip={ dataAvailable ? formattedTooltip : noDataMsg }
                          data-for={ tipId }
                          aria-describedby={ `${ preppedLabel }_description` }
                          markdownPath={ value }
                          replacements={ replacements }
                          id={ `${preppedLabel}_modal` }>
                {
                    data !== null
                        ? dataAvailable
                        ? numeral(data[0].value).format("0,0")
                        : <NotAvailable/>
                        : <Loading/>
                }{ (data && sign) ? sign : null }
                <span id={ `${ preppedLabel }_description` }
                      className={ "govuk-visually-hidden" }>
                    Abstract information: { formattedTooltip }.<br/>
                    Click for additional details.
                </span>
            </ModalTooltip>
        </Number>
        <ReactTooltip id={ tipId }
                      delayHide={ 300 }
                      place={ "bottom" }
                      backgroundColor={ "#0b0c0c" }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </NumericData>

}; // ValueItem


const ValueBox: ComponentType<*> = ({ heading, caption, valueItems, embedded=false, ...rest }) => {

    const
        label = `value-item_${heading}_${caption}`
            .toLowerCase()
            .replace(/[\s:]/g, "_"),
        tipId = `${ label }_tooltip`,
        { chart={}, isEnabled=true, setChartState=() => null } = rest,
        chartToggleCallback = () => {
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
                              aria-labelledby={ `${label}_toggle` }
                              onClick={ chartToggleCallback }
                              colour={ isEnabled ? (colours?.[chart.colour] ?? "") : "none" }>
                    <span id={ `${label}_toggle` }
                          className={ "govuk-visually-hidden" }>
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
                           order={ index }
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
                      place={ "left" }
                      backgroundColor={ "#0b0c0c" }
                      delayHide={ 300 }
                      className={ "tooltip" }
                      effect={ "solid" }/>
    </DataContainer>

};  // getValueItemSections


export default ValueBox;
