/**
 * Get Bilibili.TV Video ID.
 * @param {string} url Bilibili.TV Video URL.
 * @return {string | undefined}
 */
export const getBtvID = (url: string): string | undefined => {
    return url
        .match(
            /http(s)?:\/\/(www\.)?bilibili\.tv\/[a-zA-Z]+\/(video|play)\/(\d+)/i,
        )
        ?.at(-1);
};

export * from 'class-transformer';
export * from './fetch';
export * from './compare';
export * from './transformers/index';
