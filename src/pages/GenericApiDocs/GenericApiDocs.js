import React, { Component } from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function GenericApiDocs() {
    return <>
            <SwaggerUI url="https://raw.githubusercontent.com/publichealthengland/coronavirus-dashboard-generic-apis/development/assets/openapi.json" />
        </>   
};

export default GenericApiDocs;
