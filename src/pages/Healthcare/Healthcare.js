// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';

import { Card } from 'components/Card';
import type { Props } from './Healthcare.types';
import { Container } from './Healthcare.styles';


const Healthcare: ComponentType<Props> = ({ }: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return <Container>
        <Card />
        <Card />
    </Container>

};

export default Healthcare
