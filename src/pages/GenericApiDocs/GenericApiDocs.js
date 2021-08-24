// @flow

import React from 'react';
import SwaggerUI from "swagger-ui-react";

import URLs from "common/urls";

import type { GenericApiDocsProps } from './GenericApiDocs.types';
import type { ComponentType } from "react";

import "swagger-ui-react/swagger-ui.css";


const GenericApiDocs: ComponentType<GenericApiDocsProps> = ({}) => {

    return <SwaggerUI url={ URLs.genericApiOpenApi } />;

} ;

export default GenericApiDocs;
