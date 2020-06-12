// @flow

import React, { Fragment } from 'react';
import type { ComponentType } from 'react';

import { BigNumber, BigNumberContainer } from 'components/BigNumber';
import { FullWidthCard } from 'components/Card';
import type { Props } from './Testing.types';
import { Container } from './Testing.styles';


const Testing: ComponentType<Props> = ({ }: Props) => {

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

        <FullWidthCard caption={ "Testing in the UK by date" } />
        <FullWidthCard caption={ "Daily breakdown by pillar" } />
    </Fragment>
};

export default Testing
