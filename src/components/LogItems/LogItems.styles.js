import styled from "styled-components";
import type { ComponentType } from "react";


export const LogItemContainer: ComponentType<*> =
    styled
        .li`
            display: flex;
            flex-direction: column;
            row-gap: .5rem;
            margin-bottom: 0;
            padding: .7rem 0;
            
            &:not(:last-of-type) {
                border-bottom: 1px dotted #e7e7e7;
            }
        `;


export const LogItemHeader: ComponentType<*> =
    styled
        .div`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: start;
        `;


export const LogItemHeaderDates: ComponentType<*> =
    styled
        .span`
            display: flex;
            flex-direction: column;
            row-gap: .3rem;
        `;
