import {fetchAPI, ItemTransformed, plainToInstance} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';

/**
 * Get list of popular videos.
 * @param {SupportedLocales} locale Supported Locales.
 * @return {Promise<ItemTransformed[]>}
 */
export const getPopularList = async (
    locale: SupportedLocales = 'en_US',
): Promise<ItemTransformed[]> => {
    const response = await fetchAPI
        .get(getGatewayURL('v2').concat('home/recommend'), {
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
                modules: {
                    items: unknown[];
                    type: 'uploader' | 'ugc' | 'ogv';
                }[];
            };
        }>();

    response.data.modules = response.data.modules.filter(
        (m) => m.type === 'ogv' || m.type === 'ugc',
    );
    if (!response.data?.modules.length) return [];

    return response.data.modules
        .at(0)!
        .items.concat(response.data.modules.at(1)?.items)
        .filter((t) => typeof t === 'object')
        .map((t) => {
            const ret = plainToInstance(ItemTransformed, t, {
                strategy: 'excludeAll',
            });
            ret.genres = (t as {styles: Array<{title: string}>}).styles?.map(
                (s) => s.title,
            );

            return ret;
        });
};
