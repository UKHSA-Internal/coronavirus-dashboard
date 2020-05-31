// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { HalfWidthCard } from 'components/Card';
import type { Props } from './Cases.types';
import * as Styles from './Cases.styles';


const Cases: ComponentType<Props> = ({ }: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return <Fragment>
        <BigNumberContainer>
            <BigNumber
                caption="All time total"
                title="Lab-confirmed positive cases"
                number="250,908"
            />
            <BigNumber
                caption="All time total"
                title="Number of people tested"
                number="2,064,329"
            />
            <BigNumber
                caption="All time total"
                title="Patients recovered"
                number="75,432"
            />
        </BigNumberContainer>

        <Styles.FlexContainer>
            <HalfWidthCard />
        </Styles.FlexContainer>

        <Styles.FlexContainer>
            <HalfWidthCard />
        </Styles.FlexContainer>
    </Fragment>

};

export default Cases
