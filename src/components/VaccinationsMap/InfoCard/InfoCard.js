// @flow

import React from "react";

import { ColourReference, MapToolbox, NumberBox, NumbersContainer } from "../VaccinationsMap.styles";
import moment from "moment";
import numeral from "numeral";
import * as constants from "../constants";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { analytics } from "common/utils";
import useGenericAPI from "hooks/useGenericAPI";
import Loading from "components/Loading";


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


export const InfoCard = ({ data, areaName, date, postcode, areaType,
                      setShowInfo, maxDate, error, empty, showInfo, currentLocation, ...props }) => {

    const locationData = useGenericAPI(
        "genericApiCode",
        null,
        { area_type: areaType, area_code: currentLocation },
        "json",
        {},
        "error",
        "error"
    );

    const { f: first, c: complete, cd: areaCode } = data?.features?.find(
        ft => ft.properties.cd === currentLocation
    )?.properties ?? {};

    const firstColourIdx = Object
        .keys(constants.colourBucketReference)
        .reduce((acc, cur, ) => first > cur ? cur : acc, 0);

    const completeColourIdx = Object
        .keys(constants.colourBucketReference)
        .reduce((acc, cur, ) => complete > cur ? cur : acc, 0);


    if ( !setShowInfo ) {
        return null;
    }
    else if ( locationData === "error" ) {
        analytics({
            category: "vaccinations-map",
            action: "click::error",
            label: `INFO: ${ areaType } [${ areaCode }]`
        });

        return <Error setShowInfo={ setShowInfo }/>;
    }
    else if ( !locationData || !Object.keys(locationData).length ) {

        if ( !first ) return null;

        return <Panel setShowInfo={ setShowInfo }>
            <Loading/>
        </Panel>;
    }

    return <Panel setShowInfo={ setShowInfo }>
        <h2 className={ 'govuk-heading-m' }>
            { locationData?.[`${areaType}Name`] ?? "" }
            <small className={ "govuk-caption-s" }>
                {areaType.toUpperCase()} <br/>
                Up to and including { moment(date).subtract(1, "day").format("D MMMM YYYY") }
            </small>
        </h2>
        <NumbersContainer>
            <NumberBox>
                <h3 className={ "govuk-heading-s" }>1st dose</h3>
                <div className={ "number-row" }>
                    <ColourReference colour={ constants.colourBucketReference[firstColourIdx] }/>
                    <span className={ "number" }>{ first ? numeral(first).format("0,0.0") + "%" : "N/A" }</span>
                </div>
            </NumberBox>
            <NumberBox>
                <h3 className={ "govuk-heading-s" }>2nd dose</h3>
                <div className={ "number-row" }>
                    <ColourReference colour={ constants.colourBucketReference[completeColourIdx] }/>
                    <span className={ "number" }>{ complete ? numeral(complete).format("0,0.0") + "%" : "N/A" }</span>
                </div>
            </NumberBox>
        </NumbersContainer>
        {
            postcode
                ? <p className={ "govuk-body-s govuk-!-margin-top-1 govuk-!-margin-bottom-0" }>
                    <a className={ "govuk-link govuk-link--no-visited-state" }
                       target={ "_blank" }
                       rel={ "noopener noreferrer" }
                       href={ `/search?postcode=${postcode.replace(/[\s]/gi, "")}` }>
                        See more data for { postcode }
                    </a>
                </p>
                : null
        }
    </Panel>;

};  // InfoCard


export default InfoCard;
