import type {ITimelineAPI, TimelineData} from '@bilibili-dl/interfaces/api';
import {fetchAPI} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';

/**
 * Get list of popular videos.
 * @param {SupportedLocales} locale Supported Locales.
 * @param {string} type Supported type.
 * @return {Promise<ListTimelineAnime>}
 */
export const getTimelineList = async (
    locale: SupportedLocales = 'en_US',
    type: string = 'home',
): Promise<TimelineData> => {
    const timeline = await fetchAPI
        .get(
            getGatewayURL('v2').concat(
                `${type === 'home' ? 'home' : 'ogv'}/timeline`,
            ),
            {
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
            },
        )
        .json<ITimelineAPI>();

    return timeline.data;
};
