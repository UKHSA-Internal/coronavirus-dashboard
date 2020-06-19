// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import useResponsiveLayout from 'hooks/useResponsiveLayout';

import type { Props } from './SideNavigation.types';
import {
    SideNav,
    SideNavList,
    SideNavListItem,
    SectionBreak
} from './SideNavigation.styles';


const SideNavigation: ComponentType<Props> = ({ location: { pathname }}: Props) => {

    return (
        <SideNav aria-label="Side navigation">
            <SideNavList>
                <SideNavListItem className={`${pathname === '/' ? "moj-side-navigation__item--active" : ""}`}>
                    <Link to={ "/" } aria-current="location">UK Summary</Link>
                </SideNavListItem>

                <SideNavListItem className={`${pathname === '/testing' ? "moj-side-navigation__item--active" : ""}`}>
                    <Link to={ "testing" }>Testing</Link>
                </SideNavListItem>

                <SideNavListItem className={`${pathname === '/cases' ? "moj-side-navigation__item--active" : ""}`}>
                    <Link to={ "cases" }>Cases</Link>
                </SideNavListItem>

                <SideNavListItem className={`${pathname === '/healthcare' ? "moj-side-navigation__item--active" : ""}`}>
                    <Link to={ "healthcare" }>Healthcare</Link>
                </SideNavListItem>

                <SideNavListItem className={`${pathname === '/deaths' ? "moj-side-navigation__item--active" : ""}`}>
                    <Link to={ "deaths" }>Deaths</Link>
                </SideNavListItem>

                <SectionBreak/>

                <SideNavListItem className={`${pathname === '/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                    <Link to={ "about-data" }>About the data</Link>
                </SideNavListItem>
            </SideNavList>
        </SideNav>
    );

};

export default withRouter(SideNavigation);
