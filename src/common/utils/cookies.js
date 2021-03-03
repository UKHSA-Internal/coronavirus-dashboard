export const setCookies = () => {
    gtag('js', new Date());
    gtag(
        'config',
        'UA-161400643-2',
        {
            'anonymize_ip': true ,
            'allowAdFeatures': false
        }
    );

    window.ga('create', 'UA-145652997-1', 'auto', 'govuk_shared', { 'allowLinker': true });
    window.ga('govuk_shared.require', 'linker');
    window.ga('govuk_shared.set', 'anonymizeIp', true);
    window.ga('govuk_shared.set', 'allowAdFeatures', false);
    window.ga('govuk_shared.linker:autoLink', ['www.gov.uk']);
    window.ga('send', 'pageview');
    window.ga('govuk_shared.send', 'pageview');
};


export const deleteCookies = () => {
    document.cookie = "_ga= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=coronavirus.data.gov.uk";
    document.cookie = "_gid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=coronavirus.data.gov.uk";
};


export const handleCookieAccept = ({cookieState, setCookieState}) => {
    const
        today = new Date(),
        [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDate()],
        cookieExpiryDate = new Date(year, month + 1, day).toUTCString();

    if ( cookieState === 'set' ) {
        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":true}') }; expires=${ cookieExpiryDate };`;
        setCookies();
    } else {
        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":false}') }; expires=${ cookieExpiryDate };`;
        deleteCookies();
    }

    document.cookie = `cookies_preferences_set_21_3=true; expires=${ cookieExpiryDate };`

    setCookieState('accept');

};
