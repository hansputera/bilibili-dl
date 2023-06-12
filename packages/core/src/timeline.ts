import type {ListTimelineAnime} from '@bilibili-dl/interfaces/core';
import {fetchAPI} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';

/**
 * Get list of popular videos.
 * @param {SupportedLocales} locale Supported Locales.
 * @return {Promise<ListTimelineAnime>}
 */
export const getTimelineList = async (
    locale: SupportedLocales = 'en_US',
): Promise<ListTimelineAnime> => {
    const response = await fetchAPI
        .get(getGatewayURL('v2').concat('ogv/timeline'), {
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
        .json<{
            data: {
                items: ListTimelineAnime;
            };
        }>();

    return response.data.items;
};
