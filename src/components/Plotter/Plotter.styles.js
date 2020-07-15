// @flow

import React from "react";
import styled from 'styled-components';
import type { ComponentType } from 'react';

export const PlotContainer: ComponentType<*> = (() => {
    return styled.figure`
        padding: 0 10px;
    `;
})();