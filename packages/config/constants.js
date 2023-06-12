export const baseURL = 'https://bilibili.tv';
export const apiBaseURL = 'https://api.bilibili.tv';
/**
 * Get api gateway url.
 * @param {string} version api version.
 * @return {string}
 */
export const getGatewayURL = (version) => {
    if (typeof version === 'string') {
        return `./intl/gateway/web/${version.toLowerCase()}/`;
    } else return './intl/gateway/web/';
};
export const supportedLocales = ['en_US', 'id_ID', 'ms_MY', 'vi_VN', 'th_TH'];
