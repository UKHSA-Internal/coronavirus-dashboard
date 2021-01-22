// @flow

import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> =
    styled
        .div`
            width: 100%;
            display: grid;
            grid-gap: 2rem;
            grid-template-rows: 5px 1fr; 
            margin-top: 20px;
            grid-template-columns: repeat(7, 1fr);
        `;