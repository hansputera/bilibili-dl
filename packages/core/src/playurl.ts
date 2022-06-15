import {
    fetchAPI,
    ItemType,
    plainToInstance,
    PlayUrlTransformed,
    transformPlayUrl,
    Got,
} from '@bilibili-dl/util';
import {getGatewayURL} from '@bilibili-dl/config/constants.js';
import type {Resource, VideoResource} from '@bilibili-dl/interfaces/core';

/**
 * Get video URL by id.
 * @param {string} id Video ID
 * @param {ItemType} type Video Type.
 * @param {number} retryCount Retry count.
 * @return {Promise<PlayUrlTransformed | string>}
 */
export const getPlayUrl = async (
    id: string,
    type: ItemType = 'video',
    retryCount: number = 0,
): Promise<PlayUrlTransformed | string> => {
    try {
        const response = await fetchAPI(
            getGatewayURL(undefined).concat('playurl'),
            {
                searchParams: {
                    type: 0,
                    s_locale: 'en_US',
                    platform: 'web',
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
            if (/unknown error/gi.test(response.message) && retryCount <= 2) {
                return getPlayUrl(
                    id,
                    type === 'video' ? 'anime' : 'video',
                    retryCount++,
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
