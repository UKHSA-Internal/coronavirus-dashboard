// @flow

import React from "react";

import { ColourReference, MapToolbox, NumberBox, NumbersContainer } from "../VaccinationsMap.styles";
import moment from "moment";
import numeral from "numeral";
import * as constants from "../constants";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { analytics } from "../../../common/utils";


const Panel = ({ children, setShowInfo }) => {

    const layout = useResponsiveLayout("570");

    return <MapToolbox style={{ maxWidth: layout === "desktop" ? "300px" : "170px" }}>
        <button style={{ position: "absolute", top: 3, right: 8, margin: 0, padding: 0, cursor: "pointer", fontSize: 1.5 + "rem" }}
                role={ "button" }
                onClick={ () => setShowInfo(false) }>×</button>
        { children }
    </MapToolbox>
};


const Error = ({ setShowInfo }) => {

    const layout = useResponsiveLayout("570");

    return <Panel setShowInfo={ setShowInfo }>
        <div className={ "govuk-warning-text govuk-!-margin-bottom-0" }>
            <span className={ "govuk-warning-text__icon" } aria-hidden={ "true" }>!</span>
            <strong className={ `govuk-warning-text__text ${layout !== "desktop" ? "govuk-!-font-size-14" : ""}` }>
                <span className={ "govuk-warning-text__assistive" }>Warning</span>
                This data couldn't load. Please click away from your selected map area
                and then select it again.
            </strong>
        </div>
    </Panel>;

};


export const InfoCard = ({ areaName, date, first, complete, postcode, areaType, areaCode,
                      setShowInfo, maxDate, error, empty, showInfo, ...props }) => {

    if ( !setShowInfo ) return null;

    const firstColourIdx = Object
        .keys(constants.colourBucketReference)
        .reduce((acc, cur, ) => first > cur ? cur : acc, 0);

    const completeColourIdx = Object
        .keys(constants.colourBucketReference)
        .reduce((acc, cur, ) => complete > cur ? cur : acc, 0);

    if ( error ) {
        analytics({
            category: "vaccinations map",
            action: "click::error",
            label: areaType,
            value: areaCode
        });

        return <Error setShowInfo={ setShowInfo }/>;

    } else if ( empty ) {
        analytics({
            category: "vaccinations map",
            action: "click::empty",
            label: areaType,
            value: areaCode
        });

        return <Error setShowInfo={ setShowInfo }/>;

    } else if ( areaType && areaCode ) {
        analytics({
            category: "vaccinations map",
            action: "click",
            label: areaType,
            value: areaCode
        });
    }

    return <Panel setShowInfo={ setShowInfo }>
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
    </Panel>

};  // InfoCard


export default InfoCard;
