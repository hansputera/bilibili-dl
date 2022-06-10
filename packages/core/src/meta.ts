import {
    extractInitialState,
    fetchBase,
    MetaTransformed,
    plainToInstance,
    transformMeta,
} from '@bilibili-dl/util';

/**
 * Get Video Meta data.
 * @param {string} url Bilibili.TV Video URL.
 * @return {Promise<*>}
 */
export const getMeta = async (url: string): Promise<any> => {
    const response = await fetchBase.get('.'.concat(new URL(url).pathname));
    // identify unknown page.
    if (
        /\<title\>(.*)\<\/title\>/gi
            .exec(response.body)
            ?.at(1)
            ?.toLowerCase() === 'bstation'
    )
        return undefined;
    return plainToInstance(
        MetaTransformed,
        transformMeta(extractInitialState(response.body)),
    );
};
