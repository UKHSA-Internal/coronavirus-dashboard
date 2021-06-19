// @flow

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";

import type { Props } from './SideNavMobile.types';
import {
    MobileNavWrapper,
    MobileNavTogglerWrapper,
    MobileNavToggler,
    SideNav,
    SideNavList,
    SideNavListItem,
    SectionBreak
} from './SideNavMobile.styles';


const NavigationItems: ComponentType<Props> = ({ menuState, setMenuState, ...props }) => {

    const { pathname } = useLocation();

    useEffect(() => { setMenuState(false) }, [pathname]);

    if ( !menuState ) return null;

    return <SideNav aria-label="Side navigation" { ...props }>
        <SideNavList>
            <SideNavListItem className={`${pathname === '/' ? "moj-side-navigation__item--active" : ""}`}>
                <a href={ "/" } aria-current="location">Daily update</a>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/testing' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/testing" }>Testing</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/cases' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/cases" }>Cases</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/healthcare' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/healthcare" }>Healthcare</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/vaccinations' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/vaccinations" }>Vaccinations</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/deaths' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/deaths" }>Deaths</Link>
            </SideNavListItem>
            <li className={ "moj-side-navigation__item" }>
                <hr className={ "govuk-section-break govuk-section-break--s govuk-!-margin-top-0 govuk-!-margin-bottom-0 govuk-section-break--visible" }/>
            </li>
            <SideNavListItem className={`${pathname === '/details/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/interactive-map" }>Interactive map</Link>
            </SideNavListItem>
            <SideNavListItem className={`${pathname === '/details/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/about-data" }>About the data</Link>
            </SideNavListItem>
            <SideNavListItem className={`${pathname === '/details/download' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/download" }>Download data</Link>
            </SideNavListItem>
            <SideNavListItem className={`${pathname === '/details/whats-new' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/whats-new" }>What's new</Link>
            </SideNavListItem>
            <SideNavListItem className={`${pathname === '/details/developers-guide' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/developers-guide" }>Developer's guide</Link>
            </SideNavListItem>
        </SideNavList>
        <SectionBreak/>
    </SideNav>

};  // NavigationItems


const SideNavMobile: ComponentType<Props> = ({ ...props }: Props) => {

    const [menuState, setMenuState] = useState(false);

    return <MobileNavWrapper { ...props }>
        <MobileNavTogglerWrapper>
            <MobileNavToggler onClick={ () => setMenuState(state => !state) }>
                Menu ▼
            </MobileNavToggler>
        </MobileNavTogglerWrapper>
        <NavigationItems menuState={ menuState } setMenuState={ setMenuState }/>
    </MobileNavWrapper>;

};  // SideNavMobile


export default SideNavMobile;
