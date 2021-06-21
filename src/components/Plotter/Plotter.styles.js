// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';


export const PlotContainer: ComponentType<*> =

    styled
        .figure`
            padding: 0 10px;
            height: ${ ( height="350px" ) => height ? height : "auto" };
        `;
