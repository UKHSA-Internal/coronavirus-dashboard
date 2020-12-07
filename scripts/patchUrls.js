"use strict";

const
    fs = require("fs"),
    path = require("path"),
    replaceStream = require("replacestream");


/**
 * Default variables.
 *
 * .. note:: The behaviour of  this function depends on two environment variables:
 *           Either the `BUILD_ENV` should be set to one of `development`, `staging`
 *           or `production`; or `NODE_ENV` must be set to `production`.
 *
 * .. note:: Do **NOT** use trailing slashes in the URL.
 *
 * .. attention:: `BASE_URL` must have the HTTP(S) protocol, but other URLs must not.
 *
 * @returns { {}|{DOWNLOADS_CDN: string, BASE_URL: string, MAIN_CDN: string} }
 */
const extractEnvVars = () => {

    const prod = {
        BASE_URL: "https://coronavirus.data.gov.uk",
        MAIN_CDN: "c19pub.azureedge.net",
        DOWNLOADS_CDN: "c19downloads.azureedge.net",
        API_ENDPOINT: "api.coronavirus.data.gov.uk",
        APPINSIGHTS_INSTRUMENTATIONKEY: ""
    };

    if ( process.env.NODE_ENV === "production" && !process.env.hasOwnProperty("BUILD_ENV"))
        return  prod;


    switch (process.env.BUILD_ENV) {
        case "development":
            return {
                BASE_URL: "https://covid19statdev.azureedge.net",
                MAIN_CDN: "c19pub.azureedgedev.net",
                DOWNLOADS_CDN: "c19downloadsdev.azureedge.net"
            }

        case "staging":
            return {
                BASE_URL: "https://Covid19StaticStaging.azureedge.net",
                MAIN_CDN: "c19pub.azureedgestaging.net",
                DOWNLOADS_CDN: "c19downloadsstaging.azureedge.net"
            }

        case "production":
            return prod

        default:
            return {}

    }

}; // extractEnvVars


/**
 * Extracts ".js" and ".html" files in `directory` and its subdirectories
 * and returns an array of absolute paths.
 *
 * @param directory { string }
 * @returns { string[] }
 */
const getFiles = (directory) =>  {

    return fs
        .readdirSync(directory, { withFileTypes: true })
        .reduce((acc, item) => [
            ...acc,
            ...item.isDirectory()
                ? getFiles(path.join(directory, item.name))
                : [ path.join(directory, item.name) ]
        ], [])
        .filter(file => /\.(js|html)$/i.exec(file))

}; // getFiles


/**
 * Replaces placeholders formatted as `%key%` with environment
 * variables defined using the same key.
 *
 * @returns {  Promise<void> }
 */
const main = async () => {

    const
        directory = path.join(__dirname, "..", "build"),
        files = getFiles(directory),
        Replacements = {
            ...extractEnvVars(),
            ...process.env
        };

    for ( const file of files ) {

        const tmpFile = `${ file }.tmp`;

        await new Promise((resolve, reject) => {
            const stream = Object
                .keys(Replacements)
                .reduce((stream, key) =>
                    stream
                        .pipe(replaceStream(`%${ key }%`, Replacements[key]))
                        .pipe(replaceStream(`%REACT_APP_${ key }%`, Replacements[key])),
                    fs.createReadStream(file)
                )
                .pipe(fs.createWriteStream(tmpFile));

            stream.on("finish", resolve);
            stream.on("error", reject);
        });

        fs.unlinkSync(file);
        fs.copyFileSync(tmpFile, file);
        fs.unlinkSync(tmpFile);

    }

}; // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
