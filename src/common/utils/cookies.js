import Cookies from "js-cookie";

export const stripPII = function (str) {
    if ( !str || str === "" ) return "";

    return str.replace(/(.*)([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d{1,2}[A-Z]{1,2})(.*)/gi, '$1[REDACTED]$3')
};


export const stripPIIUri = function (str) {
    if ( !str || str === "" ) return "";

    return str.replace(/(.*)(postcode=[^&]+)(.*)/gi, '$1[REDACTED]$3')
};


export const setCookies = () => {
    console.info("Cookies accepted - setting up GA.");

    window['ga-disable-UA-161400643-2'] = false;
    window['ga-disable-UA-145652997-1'] = false;

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        window.dataLayer.push(arguments)
    }

    window.gtag = window.gtag || gtag;

    try {
        gtag('js', new Date());
        gtag(
            'config',
            'UA-161400643-2',
            {
                'anonymize_ip': true,
                'allowAdFeatures': false,
                'allow_google_signals': false,
                'allowLinker': true,
                'allow_ad_personalization_signals': false,
                'send_page_view': false,
            }
        );

        // GovUK tracker
        gtag(
            'config',
            'UA-145652997-1',
            {
                'anonymize_ip': true,
                'allowAdFeatures': false,
                'allowLinker': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false,
                'send_page_view': false,
                'linker': {
                    'domains': ["www.gov.uk", "coronavirus.data.gov.uk", "data.gov.uk", "gov.uk"]
                }
            }
        );

        console.info("GA successfully set up.");

    } catch (error) {
        console.warn("Cookies accepted, but tracking is blocked by the browser.")
        console.warn("Failed to set GA cookies.")
    }
};


export const deleteCookies = () => {
    Cookies.remove("_ga");
    Cookies.remove("_gid");
    Cookies.remove("_gat_gtag_UA_161400643_2");
    Cookies.remove("_gat_gtag_UA_145652997_1");

    window['ga-disable-UA-161400643-2'] = true;
    window['ga-disable-UA-145652997-1'] = true;

    console.info("Removed cookies and disabled tracking.");
};


export const handleCookieAccept = ( accepted ) => {
    const
        today = new Date(),
        [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDate()],
        cookieExpiryDate = new Date(year, month + 1, day).toUTCString();

    if ( accepted ) {
        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":true,"preferences":true}') }; expires=${ cookieExpiryDate };`;
        setCookies();
    } else {
        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":false,"preferences":false}') }; expires=${ cookieExpiryDate };`;
        deleteCookies();
    }

    document.cookie = `cookies_preferences_set_21_3=true; expires=${ cookieExpiryDate }; path=/`

};
