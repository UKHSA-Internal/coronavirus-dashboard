// @flow

import type { RGB, URIParameters } from "./MapTable.types";


export const hexToRgb = (hex: string): RGB => {

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return null;

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }

}; // hexToRgb


export const glAvailable = (): boolean => {

    if ( !window.WebGLRenderingContext )
        return false; // WebGL is not supported

    // WebGL is supported
    const
        canvas = document.createElement("canvas"),
        drivers = ["webgl2", "webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];

    let context = false;

    for ( const driverName of drivers ) {

        try {

            context = canvas.getContext(driverName);

            if ( context && typeof context.getParameter === "function" )
                return true;  // WebGL is enabled

        } catch (e) { }

    }

    return false;  // WebGL is disabled

}; // glAvailable


export const getParams = (uri: string): URIParameters => {

    return uri
        .replace("#", "")
        .split("&")
        .filter(item => item.indexOf("=") > -1)
        .reduce((acc, item) => {
            const [key, value] = item.split("=");
            acc[key] = value
            return acc
        }, {})

}; // getParams


export const prepAsKey = (value: string): string => {

    return value?.replace(/\s/g, "_")?.toLowerCase() ?? ""

}; // prepAsKey


export const createHash = ( kwargs: URIParameters ): string => {

    return '#' + Object
        .keys(kwargs)
        .map(key => `${prepAsKey(key)}=${prepAsKey(kwargs[key])}`)
        .join("&")

} // createHash


export const objectsAreEqual = (...objects): boolean => {

    const
        keys = Object.keys(objects[0]),
        nItems = keys.length;

    // Check number of props
    if ( !objects.every(item => Object.keys(item).length === nItems) ) return false;

    // Check value equivalence
    for ( const key of keys )
        if ( !objects.every( item => item[key] === objects[0][key] ) )
            return false;

    return true

}; // objectsAreEqual
