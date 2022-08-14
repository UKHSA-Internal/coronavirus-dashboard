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

            <SideNavListItem className={`${pathname.startsWith('/details/testing') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/testin?areaType=nation&areaName=England" }>Testing</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname.startsWith('/details/cases') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/cases?areaType=nation&areaName=England" }>Cases</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname.startsWith('/details/healthcare') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/healthcare?areaType=nation&areaName=England" }>Healthcare</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname.startsWith('/details/vaccinations') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/vaccinations?areaType=nation&areaName=England" }>Vaccinations</Link>
            </SideNavListItem>

            <SideNavListItem className={`${pathname.startsWith('/details/deaths') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/deaths?areaType=nation&areaName=England" }>Deaths</Link>
            </SideNavListItem>

        </SideNavMainContainer>

        <SectionBreak/>

        <SideNavSecondaryContainer>
            <SideNavListSecondaryItem className={`${pathname.startsWith('/details/interactive-map') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/interactive-map/cases" }>Interactive maps</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname.startsWith('/metrics') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/metrics" }>Metrics documentation</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname === '/details/download' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/download" }>Download data</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname.startsWith('/details/whats-new') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/whats-new" }>What&#39;s new</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname.startsWith('/details/developers-guide') ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/details/developers-guide" }>Developer's guide</Link>
            </SideNavListSecondaryItem>
            <SideNavListSecondaryItem className={`${pathname === '/about' ? "moj-side-navigation__item--active" : ""}`}>
                <Link to={ "/about" }>About</Link>
            </SideNavListSecondaryItem>
        </SideNavSecondaryContainer>
    </SideNav>

};

export default SideNavigation;
