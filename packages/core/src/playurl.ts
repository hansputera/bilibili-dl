import {fetchAPI} from '@bilibili-dl/util';
import {getGatewayURL} from '@bilibili-dl/config/constants.js';
import type {Resource, VideoResource} from '@bilibili-dl/interfaces/core';

/**
 * Get video URL by id.
 * @param {string} id Video ID
 * @return {Promise<void>}
 */
export const getPlayUrl = async (id: string) => {
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
        data: {
            playurl: {
                duration: number;
                audio_resource: Resource;
                video: VideoResource[];
            };
        };
    }>();

    console.log(response);
};
