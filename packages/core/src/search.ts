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
        .get(getGatewayURL('v2').concat('search'), {
            searchParams: {
                keyword: decodeURIComponent(query),
                platform: 'web',
                s_locale: locale,
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
                module: string;
                items: unknown[];
            }[];
        }>();

    response.data = response.data.filter(
        (d) => ['creator'].indexOf(d.module.toLowerCase()) === -1,
    );

    if (response.data.length < 2) return [];

    return response.data
        .at(-1)!
        .items.concat(
            compare(response.data.at(-1)?.items, response.data.at(1)?.items)
                ? []
                : response.data.at(1)?.items,
        )
        .map((t) =>
            plainToInstance(ItemTransformed, t, {
                strategy: 'excludeAll',
            }),
        );
};
