// @flow

import URLs from "../../common/urls";

export const bucketsFirst = [
    "#E7FBF9",
    20, "#DAF5F3",
    40, "#B8E9E6",
    50, "#88D5D0",
    60, "#41B1A8",
    70, "#1D968C",
    // 80, "#1D968C",
    // 80, "#087A70",
    80, "#036961",
    // 90, "#035C55",
    90, "#014D48",
];


export const colourBucketReference = {
    0: "#E7FBF9",
    20: "#DAF5F3",
    40: "#B8E9E6",
    50: "#88D5D0",
    60: "#41B1A8",
    70: "#1D968C",
    80: "#036961",
    90: "#014D48"
};


export const bucketsSecond = bucketsFirst;
    // [
    //     "#EDF5F7",
    //     // 10, "#C8E5EB",
    //     20, "#79C1D7",
    //     // 30, "#6DA9BB",
    //     40, "#3E89A0",
    //     50, "#59A7BF",
    //     60, "#5696BB",
    //     70, "#2377C0",
    //     80, "#1F68A8",
    //     90, "#1B5180",
    //     // 100, "#0A355A"
    // ];


export const MapLayers = [
    {
        label: "utla",
        name: "UTLA",
        outline: "mapUtlaRef",
        foreground: "building",
        tolerance: .25,
        buffer: 32,
        minZoom: 1,
        maxZoom: 7
    },
    {
        label: "ltla",
        name: "LTLA",
        outline: "mapLtlaRef",
        tolerance: .4,
        buffer: 32,
        minZoom: 7,
        maxZoom: 8.5,
        foreground: "utla"
    },
    {
        label: "msoa",
        name: "MSOA",
        outline: "mapMsoaRef",
        tolerance: .5,
        buffer: 32,
        minZoom: 8.5,
        maxZoom: 15.5,
        foreground: "ltla"
    }
];
