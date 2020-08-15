export type MapType = {
    map:         any,
    layerGroup:  any,
    canvas:      any,
    centrePoint: any
}

export type ZoomData = {

    min: number,
    max: number

}; // ZoomData

export type RawDataType = {

    key:   string,
    value: string

}; // RawDataType


export type RateDataType = RawDataType;

export type ValuesDataType = {

    key:      string,
    name:     string,
    rawData:  RawDataType,
    rateData: RateDataType,

}; // ValuesDataType

export type HeadingType = {

    id:         string,
    label:      string,
    format:     string,
    getter:     (ValuesDataType) => string,
    keyGetter?: (ValuesDataType) => string

} // HeadingType

export type MainContentItem = {

    headings:        HeadingType[],
    label:           string,
    textLabel:       string,
    url:             string,
    geo:             string,
    geoKey:          string,
    maxCircleRadius: number,
    blobColour:      string,
    zoom:            ZoomData

}; // MainContentType


export type MainContentType = MainContentItem[];
