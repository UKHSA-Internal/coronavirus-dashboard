import Cookies from "js-cookie";


export const setCookies = () => {
    try {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            window.dataLayer.push(arguments)
        }

        gtag('js', new Date());
        gtag(
            'config',
            'UA-161400643-2',
            {
                anonymize_ip: true,
                allowAdFeatures: false,
                send_page_view: false,
            }
        );

        window.gtag = window?.gtag || gtag;
        window.ga('create', 'UA-145652997-1', 'auto', 'govuk_shared', { 'allowLinker': true });
        window.ga('govuk_shared.require', 'linker');
        window.ga('govuk_shared.set', 'anonymizeIp', true);
        window.ga('govuk_shared.set', 'allowAdFeatures', false);
        window.ga('govuk_shared.linker:autoLink', ['www.gov.uk']);
        window.ga('send', 'pageview');
        window.ga('govuk_shared.send', 'pageview');

    } catch (error) {
        console.group("Cookie preferences")
        console.warn("Cookies accepted, but tracking is blocked by the browser.")
        console.warn("Failed to set GA cookies.")
        console.groupEnd()
    }
};


export const deleteCookies = () => {
    Cookies.remove("_ga");
    Cookies.remove("_gid");
    Cookies.remove("_gat_gtag_UA_161400643_2");
    Cookies.remove("LocationBanner");
};


export const handleCookieAccept = ( accepted ) => {
    const
        today = new Date(),
        [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDate()],
        cookieExpiryDate = new Date(year, month + 1, day).toUTCString();

    if ( accepted ) {
        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":true}') }; expires=${ cookieExpiryDate };`;
        setCookies();
    } else {
        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":false}') }; expires=${ cookieExpiryDate };`;
        deleteCookies();
    }

    document.cookie = `cookies_preferences_set_21_3=true; expires=${ cookieExpiryDate }; path=/`

};
