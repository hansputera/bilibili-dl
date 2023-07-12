import {fetchAPI} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';
import type {IPopularAPI, PopularData} from '@bilibili-dl/interfaces/api';

/**
 * Get list of popular videos.
 * @param {SupportedLocales} locale Supported Locales.
 * @return {Promise<PopularData>}
 */
export const getPopularList = async (
    locale: SupportedLocales = 'en_US',
): Promise<PopularData> => {
    const response = await fetchAPI
        .get(getGatewayURL('v2').concat('home/popular'), {
            searchParams: {
                platform: 'web',
                s_locale: locale,
                pn: 1,
                ps: 50,
            },
            headers: {
                Referer: 'https://www.bilibili.tv/'.concat(
                    locale.split('_')?.at(0)!,
                ),
                Origin: 'https://www.bilibili.tv',
                Cookie: process.env.BILI_COOKIE ?? '',
            },
        })
        .json<IPopularAPI>();

    return response.data;
};
