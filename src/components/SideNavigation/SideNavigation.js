// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { useLocation } from 'react-router';
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


const SideNavigation: ComponentType<Props> = ({ ...props }: Props) => {

    const { pathname } = useLocation();

    return <SideNav aria-label={ "Side navigation" } { ...props }>
        <SideNavMainContainer>
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

        </SideNavMainContainer>

        <SectionBreak/>

        <SideNavSecondaryContainer>
            <SideNavListSecondaryItem className={`${pathname.startsWith('/details/interactive-map') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/interactive-map/cases" }>Interactive maps</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname === '/details/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/about-data" }>About the data</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname === '/details/download' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/download" }>Download data</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname.startsWith('/details/whats-new') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/whats-new" }>What&#39;s new</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname === '/details/developers-guide' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/developers-guide" }>Developer's guide</Link>
            </SideNavListSecondaryItem>
        </SideNavSecondaryContainer>
    </SideNav>

};

export default SideNavigation;
