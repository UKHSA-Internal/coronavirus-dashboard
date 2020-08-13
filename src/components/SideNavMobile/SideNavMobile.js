// @flow

import React, { useState } from 'react';
import type { ComponentType } from 'react';
import { withRouter } from 'react-router';
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


const SideNavMobile: ComponentType<Props> = ({ location: { pathname }}: Props) => {
    const [menuState, setMenuState] = useState(false);

        return (
            <MobileNavWrapper>
                <MobileNavTogglerWrapper>
                    <MobileNavToggler onClick={ () => setMenuState(state => !state) }>
                        Menu
                    </MobileNavToggler>
                </MobileNavTogglerWrapper>
                { menuState ?
                    <SideNav aria-label="Side navigation">
                        <SideNavList>
                            <SideNavListItem className={`${pathname === '/' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "/" }
                                      onClick={ () => setMenuState(state => !state) } aria-current="location">UK Summary</Link>
                            </SideNavListItem>

                            <SideNavListItem className={`${pathname === '/testing' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "/testing" }
                                onClick={ () => setMenuState(state => !state) }>Testing</Link>
                            </SideNavListItem>

                            <SideNavListItem className={`${pathname === '/cases' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "/cases" }
                                onClick={ () => setMenuState(state => !state) }>Cases</Link>
                            </SideNavListItem>

                            <SideNavListItem className={`${pathname === '/healthcare' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "/healthcare" }
                                onClick={ () => setMenuState(state => !state) }>Healthcare</Link>
                            </SideNavListItem>

                            {/*<SideNavListItem className={`${pathname === '/deaths' ? "moj-side-navigation__item--active" : ""}`}>*/}
                            {/*    <Link to={ "/deaths" }*/}
                            {/*    onClick={ () => setMenuState(state => !state) }>Deaths</Link>*/}
                            {/*</SideNavListItem>*/}


                            <SideNavListItem className={`${pathname === '/about-data' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "/about-data" }
                                onClick={ () => setMenuState(state => !state) }>About the data</Link>
                            </SideNavListItem>
                            <SideNavListItem className={`${pathname === '/developers-guide' ? "moj-side-navigation__item--active" : ""}`}>
                                <Link to={ "/developers-guide" }
                                onClick={ () => setMenuState(state => !state) }>Developer's guide</Link>
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
