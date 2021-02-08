// @flow

import React, { useState } from 'react';
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

    return <SideNav aria-label="Side navigation" { ...props }>
        <SideNavList>
            <SideNavListItem className={`${pathname === '/' ? "moj-side-navigation__item--active" : ""}`}>
                <a href={ "/" } aria-current="location">Daily update</a>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/testing' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/testing" }
                      onClick={ () => setMenuState(state => !state) }>Testing</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/cases' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/cases" }
                      onClick={ () => setMenuState(state => !state) }>Cases</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/healthcare' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/healthcare" }
                      onClick={ () => setMenuState(state => !state) }>Healthcare</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/vaccinations' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/vaccinations" }
                      onClick={ () => setMenuState(state => !state) }>Vaccinations</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname === '/details/deaths' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/deaths" }
                      onClick={ () => setMenuState(state => !state) }>Deaths</Link>
            </SideNavListItem>
            <li className={ "moj-side-navigation__item" }>
                <hr className={ "govuk-section-break govuk-section-break--s govuk-!-margin-top-0 govuk-!-margin-bottom-0 govuk-section-break--visible" }/>
            </li>
            <SideNavListItem className={`${pathname === '/details/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/about-data" }
                onClick={ () => setMenuState(state => !state) }>About the data</Link>
            </SideNavListItem>
            <SideNavListItem className={`${pathname === '/details/download' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/download" }
                onClick={ () => setMenuState(state => !state) }>Download data</Link>
            </SideNavListItem>
            <SideNavListItem className={`${pathname === '/details/whats-new' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/whats-new" } onClick={ () => setMenuState(state => !state) }>What&#39;s New</Link>
            </SideNavListItem>
            <SideNavListItem className={`${pathname === '/details/developers-guide' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/developers-guide" }
                onClick={ () => setMenuState(state => !state) }>Developer's guide</Link>
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
        { menuState ? <NavigationItems menuState={ menuState } setMenuState={ setMenuState() }/>: null }
    </MobileNavWrapper>;

};  // SideNavMobile


export default SideNavMobile;
