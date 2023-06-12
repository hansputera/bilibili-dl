import type {PopularCards} from '@bilibili-dl/interfaces/core';
import {fetchAPI} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';

/**
 * Get list of popular videos.
 * @param {SupportedLocales} locale Supported Locales.
 * @return {Promise<PopularCards>}
 */
export const getPopularList = async (
    locale: SupportedLocales = 'en_US',
): Promise<PopularCards> => {
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
        .json<{
            data: {
                cards: PopularCards;
            };
        }>();

    return response.data.cards;
};
