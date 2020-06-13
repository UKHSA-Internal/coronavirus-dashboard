// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';

import { Card } from 'components/Card';
import type { Props } from './Deaths.types';
import { Container } from './Deaths.styles';


const Deaths: ComponentType<Props> = ({ }: Props) => {

    // ToDo: This should be done for every page in the "app.js".
    const base = document.querySelector("head>base");
    base.href = document.location.pathname;


    return <Container>
        <Card />
        <Card />
    </Container>

};

export default Deaths
