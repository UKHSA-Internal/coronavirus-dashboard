// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { HalfWidthCard } from 'components/Card';
import type { Props } from './Tests.types';
import * as Styles from './Tests.styles';


const Tests: ComponentType<Props> = ({ }: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return <Fragment>
        <BigNumberContainer>
            <BigNumber
                caption="All time total"
                title="Number of tests"
                number="3,090,566"
            />
            <BigNumber
                caption="Current daily"
                title="Planned lab-capacity"
                number="145,855"
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

export default Tests
