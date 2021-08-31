// @flow

import React from "react";

import moment from "moment";

import type { ComponentType } from "react";
import type { TimestampProps } from "./Timestamp.types";


const Timestamp: ComponentType<TimestampProps> = ({ timestamp, format="D MMMM YYYY", ...props }) => {

    return <time dateTime={ timestamp } { ...props }>
        { moment(timestamp).format(format) }
    </time>;

};  // Timestamp


export default Timestamp;
