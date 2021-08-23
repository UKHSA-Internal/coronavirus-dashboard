import React, { Component } from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import type { GenericApiDocsProps } from './GenericApiDocs.types';
        
export default class GenericApiDocs extends Component<GenericApiDocsProps, {}> {

    render(): React$Node {

        return <>
            <SwaggerUI url="https://raw.githubusercontent.com/publichealthengland/coronavirus-dashboard-generic-apis/development/assets/openapi.json" />
        </>

    }

} 