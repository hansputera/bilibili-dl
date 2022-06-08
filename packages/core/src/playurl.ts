import {fetchAPI} from '@bilibili-dl/util';
import {getGatewayURL} from '@bilibili-dl/config/constants.js';

interface Resource {
    bandwith: number;
    codecs: string;
    duration: number;
    id: string; // we will use this to identify the video/audio.
    mime_type: string;
    quality: number;
    size: number;
    url: string; // audio url.
}

interface VideoStreamInfo {
    desc_words: string;
    quality: number;
}

interface VideoResource {
    audio_quality: number;
    stream_info: VideoStreamInfo;
    video_resource: Resource;
}

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
                audio_resource: Resource[];
                video: VideoResource[];
            };
        };
    }>();

    console.log(response);
};
