import {fetchAPI} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';
import type {ITrendingAPI, TrendingData} from '@bilibili-dl/interfaces/api';

/**
 * Get list of popular videos.
 * @param {SupportedLocales} locale Supported Locales.
 * @return {Promise<TrendingData>}
 */
export const getTrendingList = async (
    locale: SupportedLocales = 'en_US',
): Promise<TrendingData> => {
    const trending = await fetchAPI
        .get(getGatewayURL('v2').concat('/home/ogv/trending'), {
            searchParams: {
                platform: 'web',
                s_locale: locale,
            },
            headers: {
                Referer: 'https://www.bilibili.tv/'.concat(
                    locale.split('_')?.at(0)!,
                ),
                Origin: 'https://www.bilibili.tv',
                Cookie: process.env.BILI_COOKIE ?? '',
            },
        })
        .json<ITrendingAPI>();

    return trending.data;
};
