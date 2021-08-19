// @flow

import React, { useState, useEffect } from "react";

import useGenericAPI from "hooks/useGenericAPI";

import html from "remark-html";
import remark from "remark";
import externalLink from "remark-external-links";
import moment from "moment";

import type { ComponentType } from 'react';
import type { BannerType } from "./Banner.types";

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


const Datestamp: ComponentType<*> = ({ banner, ...props }) => {

    const timestamp = banner?.date ?? banner.appearByUpdate;

    return <div className={ "timestamp" }>
        <Timestamp dateTime={ moment(timestamp).toISOString() } { ...props }>{
        moment(timestamp).format("D MMMM YYYY")
    }</Timestamp>
    </div>

};  // Datestamp


const Banner: ComponentType<*> = ({ ...props }) => {

    const banners: BannerType[] = useGenericAPI("banner", null);
    const [preppedBanners, setPreppedBanners] = useState([]);

    useEffect(() => {

        if ( Array.isArray(banners) && banners.length > 0 ) {
            setPreppedBanners(banners);
        } else if ( banners && Object.keys(banners).length ) {
            setPreppedBanners([banners])
        }

    }, [banners]);


    if ( banners === null ) return null;

    return <>{
        preppedBanners.map((banner, index) =>
            <BannerBase key={ `banner-${index}-${banner?.appearByUpdate}` } { ...props }>
                <BannerContent>
                    <Datestamp banner={ banner.date }/>
                    <BannerBody rawBody={ banner?.body ?? "" }/>
                </BannerContent>
            </BannerBase>
        )
    }</>;

};  // Banner


export default Banner;
