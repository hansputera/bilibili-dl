import {extractInitialState, fetchBase} from '@bilibili-dl/util';

/**
 * Get Video Meta data.
 * @param {string} url Bilibili.TV Video URL.
 * @return {Promise<*>}
 */
export const getMeta = async (url: string): Promise<any> => {
    const response = await fetchBase.get('.'.concat(new URL(url).pathname));
    if (/404\.png/gi.test(response.body)) return undefined;
    return extractInitialState(response.body);
};
