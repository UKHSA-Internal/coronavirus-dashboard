// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import type { Props } from './SideNavigation.types';
import {
    SideNav,
    SideNavMainContainer,
    SideNavListItem,
    SectionBreak,
    SideNavSecondaryContainer,
    SideNavListSecondaryItem
} from './SideNavigation.styles';


const SideNavigation: ComponentType<Props> = ({ location: { pathname }}: Props) => {

    return <SideNav aria-label="Side navigation">
        <SideNavMainContainer>
            <SideNavListItem className={`${pathname === '/' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/" } aria-current="location">UK Summary</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/testing' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/testing" }>Testing</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/cases' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/cases" }>Cases</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/healthcare' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/healthcare" }>Healthcare</Link>
            </SideNavListItem>

            {/*<SideNavListItem className={`${pathname === '/deaths' ? "moj-side-navigation__item--active" : ""}`}>*/}
            {/*    <Link to={ "/deaths" }>Deaths</Link>*/}
            {/*</SideNavListItem>*/}

        </SideNavMainContainer>

        <SectionBreak/>

        <SideNavSecondaryContainer>
            <SideNavListSecondaryItem className={`${pathname === '/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/about-data" }>About the data</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname === '/developers-guide' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/developers-guide" }>Developer's guide</Link>
            </SideNavListSecondaryItem>
        </SideNavSecondaryContainer>
    </SideNav>

};

export default withRouter(SideNavigation);
