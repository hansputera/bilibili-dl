import {
    fetchAPI,
    ItemTransformed,
    plainToInstance,
    compare,
} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';

/**
 * Search videos/anime from given query.
 * @param {string} query Search query.
 * @return {Promise<ItemTransformed[]>}
 */
// TODO: create pagination request
export const searchQuery = async (
    query: string,
    locale: SupportedLocales = 'en_US',
): Promise<ItemTransformed[]> => {
    const response = await fetchAPI
        .get(getGatewayURL('v2').concat('search_v2'), {
            searchParams: {
                keyword: decodeURIComponent(query),
                platform: 'web',
                s_locale: locale,
                pn: 1,
                ps: 20,
            },
            headers: {
                Referer: 'https://www.bilibili.tv/'.concat(
                    locale.split('_')?.at(0)!,
                ),
                Origin: 'https://www.bilibili.tv',
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
        m => m.type === 'ogv' || m.type === 'ugc'
    );
    if (!response.data?.modules.length) return [];

    return response.data.modules
        .at(0)!.items.concat(response.data.modules.at(1)?.items)
        .map((t) =>
            plainToInstance(ItemTransformed, t, {
                strategy: 'excludeAll',
            }),
        ).filter(t => typeof t === 'object');
};
