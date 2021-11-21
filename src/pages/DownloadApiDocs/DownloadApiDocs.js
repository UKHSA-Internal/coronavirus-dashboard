// @flow

import React from 'react';
import SwaggerUI from "swagger-ui-react";

import URLs from "common/urls";

import type { DownloadApiDocsProps } from './DownloadApiDocs.types';
import type { ComponentType } from "react";

import "swagger-ui-react/swagger-ui.css";


const DownloadApiDocs: ComponentType<DownloadApiDocsProps> = ({}) => {

    return <SwaggerUI url={ URLs.downloadApiOpenApi } />;

} ;

export default DownloadApiDocs;
