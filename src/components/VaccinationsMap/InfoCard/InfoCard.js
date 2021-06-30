// @flow

import React from "react";

import { MapToolbox, NumberBox, NumbersContainer } from "../VaccinationsMap.styles";
import moment from "moment";
import numeral from "numeral";
import useResponsiveLayout from "hooks/useResponsiveLayout";


export const InfoCard = ({ areaName, date, first, complete, postcode, areaType, areaCode,
                      setShowInfo, maxDate, ...props }) => {


    const layout = useResponsiveLayout("570");

    if ( !setShowInfo ) return null;

    return <MapToolbox style={{ maxWidth: layout === "desktop" ? "300px" : "150px" }}>
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
                            <span className={ "number" }>{ first }</span>
                        </div>
                    </NumberBox>
                    <NumberBox>
                        <h3 className={ "govuk-heading-s" }>2nd dose</h3>
                        <div className={ "number-row" }>
                            <span className={ "number" }>{ numeral(complete).format("0,0.0") }</span>
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
