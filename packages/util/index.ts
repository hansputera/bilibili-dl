import 'reflect-metadata';

interface BtvID {
    seasonId?: string;
    videoId: string;
}

/**
 * Get Bilibili.TV Video ID.
 * @param {string} url Bilibili.TV Video URL.
 * @return {BtvID | undefined}
 */
export const getBtvID = (url: string): BtvID | undefined => {
    const matchs =
        /http(s)?:\/\/(www\.)?bilibili\.tv\/[a-zA-Z]+\/(video|play)\/(\d+)(\/(\d+))?/gi.exec(
            url,
        );

    if (matchs) {
        if (matchs.length > 5)
            return {
                seasonId: matchs.at(4),
                videoId: matchs.at(-1)!,
            };
        else
            return {
                videoId: matchs.at(-1)!,
            };
    } else {
        return undefined;
    }
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
export * from './extractors/index';
