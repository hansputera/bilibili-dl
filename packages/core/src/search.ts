import {
    fetchAPI,
    ItemTransformed,
    plainToInstance,
    compare,
} from '@bilibili-dl/util';
import {getGatewayURL} from '@bilibili-dl/config/constants.js';

/**
 * Search videos/anime from given query.
 * @param {string} query Search query.
 * @return {Promise<ItemTransformed[]>}
 */
// TODO: create pagination request
export const searchQuery = async (
    query: string,
): Promise<ItemTransformed[]> => {
    const response = await fetchAPI
        .get(getGatewayURL('v2').concat('search'), {
            searchParams: {
                keyword: encodeURIComponent(query),
                platform: 'web',
                s_locale: 'id-ID',
            },
        })
        .json<{
            data: {
                items: unknown[];
            }[];
        }>();

    if (response.data.length < 2) return [];

    return response.data
        .at(-1)!
        .items.concat(
            compare(response.data.at(-1), response.data.at(1))
                ? []
                : response.data.at(1)!.items,
        )
        .map((t) =>
            plainToInstance(ItemTransformed, t, {
                strategy: 'excludeAll',
            }),
        );
};
