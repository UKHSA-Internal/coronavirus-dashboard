import type { ComponentType } from "react";
import styled from "styled-components";

export const DataList: ComponentType<*> =
    styled
        .ul
        .attrs(({ className="" }) => ({
            className: `govuk-list govuk-list--dashed ${className}`
        }))`   
            display: flex !important;
            flex-direction: column;
            font-size: larger;
            & > dt {
                margin-right: auto !important;
                margin-bottom: .3rem;
            }
            & > dd {
                margin-bottom: 1.5rem;
                margin-top: .3rem;

                code {
                    background: #f3f2f1;
                    border: 1px solid #D7D7D7;
                    padding: 3px 5px;
                    border-radius: 3px;
                }
            }
        `;
