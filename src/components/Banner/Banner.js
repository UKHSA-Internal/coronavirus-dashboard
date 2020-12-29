// @flow

import React, { useState, useEffect } from "react";

import { useLocation } from "react-router";

import useGenericAPI from "hooks/useGenericAPI";
import useTimestamp from "hooks/useTimestamp";
import Loading from "components/Loading";

import html from "remark-html";
import remark from "remark";
import externalLink from "remark-external-links";
import moment from "moment";

import type { ComponentType } from 'react';
import { BannerBase, BannerContent, Body, Timestamp } from "./Banner.styles";


const BannerBody: ComponentType<*> = ({ rawBody, ...props }) => {

    const [data, setData] = useState("");

    useEffect(() => {
        remark()
            .use(externalLink)
            .use(html)
            .process(rawBody, (err, text) => {
                if ( !err )
                    setData(String(text));
                else
                    console.error(err);
            });
    }, [ rawBody ]);

    return <Body className={ "markdown" }
                 dangerouslySetInnerHTML={{ __html: data }}
                 { ...props }/>

};  // Banner Body



const Banner: ComponentType<*> = ({ ...props }) => {

    const timestamp = useTimestamp();
    const banners = useGenericAPI("banner", null);
    const { pathname } = useLocation();

    if ( banners === null ) return <Loading/>;
    if ( !banners?.length ) return null;

    const ts = moment(timestamp);

    return <>{
        banners
            .filter(({ appearByUpdate, disappearByUpdate, displayUri=[] }) =>
                moment(appearByUpdate) <= ts   &&
                ts < moment(disappearByUpdate) &&
                (
                    displayUri.length
                        ? displayUri.find(uri => uri.toLowerCase() === pathname.toLowerCase())
                        : true
                )
            )
            .map((banner, index) =>
                <BannerBase key={ `banner-${index}-${banner?.appearByUpdate}` } { ...props }>
                    <BannerContent>
                        <Timestamp dateTime={ moment(banner?.appearByUpdate).toISOString() }>{
                            moment(banner?.appearByUpdate).format("DD MMMM YYYY")
                        }</Timestamp>
                        <BannerBody rawBody={ banner?.body ?? "" }/>
                    </BannerContent>
                </BannerBase>
            )
    }</>

};  // Banner


export default Banner;
