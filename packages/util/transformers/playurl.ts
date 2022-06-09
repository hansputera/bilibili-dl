/* eslint-disable */
import {Resource, VideoResource} from '@bilibili-dl/interfaces/core';
import {Expose, Transform, Type} from 'class-transformer';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';

/**
 * @class PlayUrlResourceTransformed
 */
export class PlayUrlResourceTransformed {
    @Expose()
    url!: string;

    @Expose()
    id!: string;

    @Expose()
    @Transform(({value}) => prettyMs(value))
    duration!: string;

    @Expose()
    mimeType!: string;

    @Expose()
    codecs!: string;

    @Expose()
    @Transform(({value}) => prettyBytes(value))
    size!: string;

    @Expose()
    quality!: number;
}

/**
 * @class PlayUrlTransformed
 */
export class PlayUrlTransformed {
    @Expose()
    duration!: number;

    @Expose()
    @Type(() => PlayUrlResourceTransformed)
    audios!: PlayUrlResourceTransformed[];

    @Expose()
    @Type(() => PlayUrlResourceTransformed)
    videos!: PlayUrlResourceTransformed[];
}

interface RawPlayUrlStruct {
    duration: number;
    audio_resource: Resource[];
    video: VideoResource[];
}

/**
 * Transform raw "playurl" data
 * @param {RawPlayUrlStruct} data original playurl data.
 * @return {*}
 */
export const transformToReadable = (data: RawPlayUrlStruct) => {
    return {
        duration: data.duration,
        audios: data.audio_resource.map((audio) => ({
            url: audio.url,
            id: audio.id,
            mimeType: audio.mime_type,
            codecs: audio.codecs,
            size: audio.size,
        })),
        videos: data.video.map((video) => ({
            url: video.video_resource.url,
            quality: video.stream_info.quality,
            mimeType: video.video_resource.mime_type,
            size: video.video_resource.size,
            codecs: video.video_resource.codecs,
            id: video.video_resource.id,
        })),
    };
};
