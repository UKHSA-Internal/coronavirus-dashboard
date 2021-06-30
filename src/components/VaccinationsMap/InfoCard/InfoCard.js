// @flow

import React from "react";

import { ColourReference, MapToolbox, NumberBox, NumbersContainer } from "../VaccinationsMap.styles";
import moment from "moment";
import numeral from "numeral";
import * as constants from "../constants";
import useResponsiveLayout from "hooks/useResponsiveLayout";


export const InfoCard = ({ areaName, date, first, complete, postcode, areaType, areaCode,
                      setShowInfo, maxDate, ...props }) => {


    const layout = useResponsiveLayout("570");

    if ( !setShowInfo ) return null;

    const firstColourIdx = Object
        .keys(constants.colourBucketReference)
        .reduce((acc, cur, ) => first > cur ? cur : acc, 0);

    const completeColourIdx = Object
        .keys(constants.colourBucketReference)
        .reduce((acc, cur, ) => complete > cur ? cur : acc, 0);

    return <MapToolbox style={{ maxWidth: layout === "desktop" ? "300px" : "170px" }}>
        <button style={{ position: "absolute", top: 3, right: 8, margin: 0, padding: 0, cursor: "pointer", fontSize: 1.5 + "rem" }}
                role={ "button" }
                onClick={ () => setShowInfo(false) }>×</button>
        <h2 className={ 'govuk-heading-m' }>
            { areaName }
            <small className={ "govuk-caption-s" }>
                {areaType.toUpperCase()} <br/>
                Up to and including { moment(date).format("DD MMMM YYYY") }
            </small>
        </h2>
        { typeof first === "number"
            ? <>
                <NumbersContainer>
                    <NumberBox>
                        <h3 className={ "govuk-heading-s" }>1st dose</h3>
                        <div className={ "number-row" }>
                            <ColourReference colour={ constants.colourBucketReference[firstColourIdx] }/>
                            <span className={ "number" }>{ numeral(first).format("0,0.0") + "%" }</span>
                        </div>
                    </NumberBox>
                    <NumberBox>
                        <h3 className={ "govuk-heading-s" }>2nd dose</h3>
                        <div className={ "number-row" }>
                            <ColourReference colour={ constants.colourBucketReference[completeColourIdx] }/>
                            <span className={ "number" }>{ numeral(complete).format("0,0.0") + "%" }</span>
                        </div>
                    </NumberBox>
                </NumbersContainer>
            </>
            : <p>Data missing.</p>
        }
        {
            postcode &&
            <p className={ "govuk-body-s govuk-!-margin-top-1 govuk-!-margin-bottom-0" }>
                <a className={ "govuk-link govuk-link--no-visited-state" }
                   target={ "_blank" }
                   rel={ "noopener noreferrer" }
                   href={ `/search?postcode=${postcode.replace(/[\s]/gi, "")}` }>
                    See more data for { postcode }
                </a>
            </p>
        }
    </MapToolbox>

};  // InfoCard


export default InfoCard;
