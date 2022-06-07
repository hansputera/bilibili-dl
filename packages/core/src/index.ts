import {
    fetchAPI,
    ItemTransformed,
    plainToClass,
    compare,
} from '@bilibili-dl/util';
import {getGatewayURL} from '@bilibili-dl/config/constants.js';

/**
 * @param {string} q
 * @return {Promise<void>}
 */
export const search = async (q: string) => {
    const response = await fetchAPI
        .get(getGatewayURL('v2').concat('search'), {
            searchParams: {
                keyword: encodeURIComponent(q),
                platform: 'web',
                s_locale: 'id-ID',
            },
        })
        .json<{
            data: {
                items: unknown[];
            }[];
        }>();

    const data = response.data
        .at(-1)!
        .items.concat(
            compare(response.data.at(-1), response.data.at(1))
                ? []
                : response.data.at(1)!.items,
        )
        .map((t) => plainToClass(ItemTransformed, t, {
          strategy: 'excludeAll'
        }));

    console.log(data);
};

search('Enen no shouboutai');
