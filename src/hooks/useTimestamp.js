import { useEffect, useState, useRef } from "react";
import axios from "axios";
import URLs from "common/urls";


const useTimestamp = () => {

    const
        [ timestamp, setTimestamp ] = useState(""),
        cache = useRef({});

    useEffect(() => {

        if ( cache && "timestamp" in cache.current ) {

            setTimestamp(cache.current.timestamp)

        } else {

            (async () => {
                const { data, status } = await axios.get(URLs.timestamp, { responseType: 'text' });

                if ( status < 400 ) {

                    cache.current.timestamp = data;

                    setTimestamp(cache.current.timestamp)

                } else {
                    console.error(`Failed timestamp request - status ${status}`)
                    setTimestamp("")
                }

            })();

        }

    }, []);

    return timestamp

};  // useTimestamp


export default useTimestamp;
