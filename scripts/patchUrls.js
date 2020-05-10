"use strict";

const
    fs = require("fs"),
    path = require("path"),
    replaceStream = require("replacestream");



const extractEnvVars = () => {
    if (process.env.hasOwnProperty("BUILD_ENV")) return {}


    switch (process.env.BUILD_ENV) {

        case "development":
            return {
                MAIN_CDN: "c19pub.azureedgedev.net",
                DOWNLOADS_CDN: "c19downloadsdev.azureedge.net"
            }
        case "staging":
            return {
                MAIN_CDN: "c19pub.azureedgestaging.net",
                DOWNLOADS_CDN: "c19downloadsstaging.azureedge.net"
            }
        case "production":
            return {
                MAIN_CDN: "c19pub.azureedge.net",
                DOWNLOADS_CDN: "c19downloads.azureedge.net"
            }
        default:
            return {}

    }

}


const Replacements = {
    ...extractEnvVars(),
    ...process.env
};


const main = async () => {

    const directory = path.join(__dirname, "..", "build", "static", "js");

    const files = fs
        .readdirSync(directory)
        .filter(file => file.endsWith(".js"))
        .map(fileName => path.join(directory, fileName));

    for ( const file of files ) {

        const tmpFile = `${ file }.tmp`;

        await new Promise((resolve, reject) => {
            let stream = fs.createReadStream(file);

            for ( const varName in Replacements ) {

                if ( !process.env.hasOwnProperty(varName) ) continue;

                const varValue = process.env[varName];

                stream = stream.pipe(
                    replaceStream(`{{${varName}}}`, varValue)
                )

            }

            stream.pipe(fs.createWriteStream(tmpFile));
            stream.on("finish", resolve);
            stream.on("error", reject);
        });
        fs.unlinkSync(file);
        fs.copyFileSync(tmpFile, file);
        fs.unlinkSync(tmpFile);

    }

};

main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
