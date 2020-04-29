import styled, { css } from "styled-components";
import addIECss from "addIECss";

export const Container: ComponentType<*> = (() =>

      styled.div`
        grid-column: 1/-1;
        display: flex;
        flex-direction: column;
        margin-top: 45px;
        margin-bottom: 40px;
        
        ${addIECss(css`
          width: 80%;
        `)}
      `

)();

export const SectionHeader: ComponentType<*> = (() =>

      styled.h2``

)();


export const DownloadLink: ComponentType<*> = (() =>

      styled.a`
        text-decoration: none;
      `

)();


export const BodyCell: ComponentType<*> = (() =>

      styled.td`
      &:first-of-type {
        padding-left: 0.5rem;
      }
      
      &.latest {
        background: #e7e7e7;
      }
      `

)();

export const HeadCell: ComponentType<*> = (() =>

      styled.th`
      &:first-of-type {
        padding-left: 0.5rem;
      }
      `

)();


export const TableContainer: ComponentType<*> = (() =>

        styled.div`
        padding-top: 0;
        max-height: 75vh;
        overflow-y: scroll;
        `

)();

export const Table: ComponentType<*> = (() =>

        styled.table`
        margin-top: 1rem;
        
        &>thead {
            padding-top: 20px;
        }
        `

)();