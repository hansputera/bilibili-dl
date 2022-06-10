import {fetchAPI, plainToInstance, PlayUrlTransformed} from '@bilibili-dl/util';
import {getGatewayURL} from '@bilibili-dl/config/constants.js';
import type {Resource, VideoResource} from '@bilibili-dl/interfaces/core';

/**
 * Get video URL by id.
 * @param {string} id Video ID
 * @return {Promise<PlayUrlTransformed>}
 */
export const getPlayUrl = async (
    id: string,
): Promise<PlayUrlTransformed | undefined> => {
    const response = await fetchAPI(
        getGatewayURL(undefined).concat('playurl'),
        {
            searchParams: {
                aid: id,
                type: 0,
                s_locale: 'id-ID',
                platform: 'web',
            },
        },
    ).json<{
        code: number;
        data: {
            playurl: {
                duration: number;
                audio_resource: Resource[];
                video: VideoResource[];
            };
        };
    }>();

    if (+response.code === 404 || !response.data) {
        return undefined;
    }
    return plainToInstance(PlayUrlTransformed, response.data.playurl);
};
