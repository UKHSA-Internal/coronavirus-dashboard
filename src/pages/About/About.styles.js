// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Article: ComponentType<*> = (() =>
    styled.article`
        max-width: 40em`
)();
