import 'reflect-metadata';

/**
 * Get Bilibili.TV Video ID.
 * @param {string} url Bilibili.TV Video URL.
 * @return {string | undefined}
 */
export const getBtvID = (url: string): string | undefined => {
    return url
        ?.match(
            /http(s)?:\/\/(www\.)?bilibili\.tv\/[a-zA-Z]+\/(video|play)\/(\d+)/i,
        )
        ?.at(-1);
};

/**
 * JSON parse with exception handle.
 * @param {string} str String want to parse.
 * @param {*} defaultValue Default value if an error is triggered.
 * @return {*}
 */
export const jsonParse = <T>(str: string, defaultValue: any = {}): T => {
    if (typeof str !== 'string') return defaultValue;
    try {
        return JSON.parse(str);
    } catch {
        return defaultValue;
    }
};

export * from 'class-transformer';
export * from './fetch';
export * from './compare';
export * from './transformers/index';
export * as Got from 'got';
