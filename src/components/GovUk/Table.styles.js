// @flow
import React from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';


export const TableComponent: ComponentType<*> = (() => {

    const Container = styled.div`
      max-height: 350px;
      overflow: scroll;

      &>table {
        font-size: 1.1rem;
        background-color: transparent !important;
      }
    `;

    return ({ ...props}) => <Container>
      <table {...props}/>
    </Container>

})();
