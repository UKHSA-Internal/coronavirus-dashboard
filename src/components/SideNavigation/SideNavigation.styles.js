// @flow

import styled from 'styled-components';
import type { ComponentType } from 'react';

export const Container: ComponentType<*> = (() => {
  return styled.nav`
    width: 100%;
    box-sizing: border-box;
    background-color: #f8f8f8;
    display: block;

    &:after {
      content: "";
      display: block;
      clear: both;
    }
  `;
})();

export const NavList: ComponentType<*> = (() => {
  return styled.ul`
    max-width: 1015px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    left: -15px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    height: 50px;
  `;
})();

export const NavListItem: ComponentType<*> = (() => {
  const borderWidth = ({ active }) => active ? 4 : 0;
  return styled.li`
    list-style: none;
    box-sizing: border-box;
    display: block;
    position: relative;
    height: 50px;
    padding: 0 15px;
    float: left;
    line-height: 50px;
    border-bottom: ${borderWidth}px solid #1d70b8;
  `;
})();

export const FooterLink: ComponentType<*> = (() => {
  return styled.a`
    font-weight: 700;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.25;
    text-decoration: none;
    cursor: pointer;
    color: #1d70b8;
  `;
})();
