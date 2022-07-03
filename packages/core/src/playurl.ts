import {
    fetchAPI,
    ItemType,
    plainToInstance,
    PlayUrlTransformed,
    transformPlayUrl,
    Got,
} from '@bilibili-dl/util';
import {
    getGatewayURL,
    SupportedLocales,
} from '@bilibili-dl/config/constants.js';
import type {Resource, VideoResource} from '@bilibili-dl/interfaces/core';

/**
 * Get video URL by id.
 * @param {string} id Video ID
 * @param {ItemType} type Video Type.
 * @param {SupportedLocales} locale Supported Locale.
 * @param {number} retryCount Retry count.
 * @return {Promise<PlayUrlTransformed | string>}
 */
export const getPlayUrl = async (
    id: string,
    type: ItemType = 'video',
    locale: SupportedLocales = 'en_US',
    retryCount: number = 0,
): Promise<PlayUrlTransformed | string> => {
    try {
        const response = await fetchAPI(
            getGatewayURL(undefined).concat('playurl'),
            {
                searchParams: {
                    type: 0,
                    s_locale: locale,
                    platform: 'web',
                    qn: 4,
                    tf: 0,
                    device: 'wap',
                    spm_id: 'bstar-web.pgc-video-detail.0.0',
                    ...(type === 'video'
                        ? {
                              aid: id,
                          }
                        : {
                              ep_id: id,
                          }),
                },
                timeout: {
                    connect: 3000,
                    request: 5000,
                    response: 5000,
                    socket: 4000,
                    send: 5000,
                    secureConnect: 5000,
                    read: 5000,
                    lookup: 5000,
                },
                headers: {
                    Origin: 'https://www.bilibili.tv',
                    Referer: 'https://www.bilibili.tv/'.concat(
                        locale.split('_').at(0)!,
                    ),
                },
            },
        ).json<{
            code: number;
            message: string;
            data: {
                playurl: {
                    duration: number;
                    audio_resource: Resource[];
                    video: VideoResource[];
                };
            };
        }>();
        if (+response.code === 404 || !response.data) {
            if (retryCount <= 2) {
                retryCount++;
                return getPlayUrl(
                    id,
                    type === 'video' ? 'anime' : 'video',
                    locale,
                    retryCount,
                );
            }
            return response.message;
        }
        return plainToInstance(
            PlayUrlTransformed,
            transformPlayUrl(response.data.playurl),
        );
    } catch (e) {
        if (e instanceof Got.HTTPError) {
            if (e.response.statusCode === 412) {
                return 'Probably the request is denied';
            } else return e.response.statusMessage || e.message;
        } else {
            return (e as Error).message;
        }
    }
};
