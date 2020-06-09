
import React from "react";
import styled, { css } from "styled-components";
import addIECss from "addIECss";


export const TextContainer: ComponentType<*> = (() =>
    styled.div`
        max-width: 40em;
    `
)();


export const DownloadLink = ({ className = '', ...props }) => (
    <a className={ `govuk-link ${className}` } { ...props }/>
);


export const Loading = ({ className = '', ...props }) => (
    <p className={ `govuk-body govuk-!-margin-top-6 ${className}` } { ...props }/>
);


export const TableContainer: ComponentType<*> = (() =>
    styled.div`
        max-height: 75vh;
        padding-top: 0;
        overflow-y: scroll;
    `
)();


export const Table: ComponentType<*> = (() => {
    const
        classes = 'govuk-table',
        Node = styled.table`
            margin-top: 1rem;

            & > thead {
                padding-top: 20px;
            }
        `;

    return ({ className = '', ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const HeadCell: ComponentType<*> = (() => {
    const
        classes = 'govuk-table__header app-custom-class',
        Node = styled.th`
            &:first-of-type {
                padding-left: 0.5rem;
            }
        `;

    return ({ className = '', ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const BodyCell: ComponentType<*> = (() => {
    const
        classes = 'govuk-table__cell',
        Node = styled.td`
            &:first-of-type {
                padding-left: 0.5rem;
            }

            &.latest {
                background: #e7e7e7;
            }
        `;

    return ({ className = '', ...props }) =>
        <Node className={ `${classes} ${className}` } { ...props }/>
})();


export const Tag = ({ className = '', ...props }) => (
    <strong className={ `govuk-tag ${className}` } { ...props }/>
);
