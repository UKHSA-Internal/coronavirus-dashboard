// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() =>

  styled.main`
    display: flex;
    flex-direction: column;
    margin-top: 45px;
    margin-bottom: 40px;
  `

)();

export const Body: ComponentType<*> = (() =>

  styled.p``

)();
