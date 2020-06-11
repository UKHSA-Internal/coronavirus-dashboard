// @flow

import React, { Fragment, useState } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import useResponsiveLayout from 'hooks/useResponsiveLayout';

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


const SideNavMobile: ComponentType<Props> = ({ location: { pathname }}: Props) => {
    const [menuState, setMenuState] = useState(false);

        return (
            <MobileNavWrapper>
                <MobileNavTogglerWrapper>
                    <MobileNavToggler onClick={ () => setMenuState(!menuState) }>
                        Menu
                    </MobileNavToggler>
                </MobileNavTogglerWrapper>
                { menuState ?
                    <SideNav aria-label="Side navigation">
                        <SideNavList>
                            <SideNavListItem className={`${pathname === '/' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "/" } aria-current="location">UK Summary</Link>
                            </SideNavListItem>

                            <SideNavListItem className={`${pathname === '/tests' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "tests" }>Tests</Link>
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


                            <SideNavListItem className={`${pathname === '/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "about-data" }>About the data</Link>
                            </SideNavListItem>
                        </SideNavList>
                        <SectionBreak/>
                    </SideNav>
                    : ''
                }
            </MobileNavWrapper>
        );


};

export default withRouter(SideNavMobile);
