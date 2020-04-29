import styled, { css } from "styled-components";
import addIECss from "addIECss";

export const Container: ComponentType<*> = (() =>

  styled.div`
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;

    ${addIECss(css`
      width: 80%;
    `)}
  `

)();


export const DownloadLink: ComponentType<*> = (() =>

  styled.a`
    text-decoration: none;
  `

)();
