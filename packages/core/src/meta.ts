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
 * @return {Promise<MetaTransformed | undefined>}
 */
export const getMeta = async (
    url: string,
): Promise<MetaTransformed | undefined> => {
    const response = await fetchBase.get('.'.concat(new URL(url).pathname));
    // identify unknown page.
    if (
        /\<title\>(.*)\<\/title\>/gi
            .exec(response.body)
            ?.at(1)
            ?.toLowerCase() === 'bilibili'
    )
        return undefined;
    return plainToInstance(
        MetaTransformed,
        transformMeta(extractInitialState(response.body)),
    );
};
