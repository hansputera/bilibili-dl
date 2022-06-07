import {fetchAPI} from '@bilibili-dl/util';
import {getGatewayURL} from '@bilibili-dl/config/constants.js';

/**
 * @param {string} q
 * @return {Promise<void>}
 */
export const search = async (q: string) => {
    const response = await fetchAPI.get(getGatewayURL('v2').concat('search'), {
        searchParams: {
            keyword: encodeURIComponent(q),
            platform: 'web',
            s_locale: 'id-ID',
        },
    });

    console.log(response.url);
    console.log(response.body);
};

search('Enen no shouboutai');
