/* eslint-disable */
import type {Resource, VideoResource} from '@bilibili-dl/interfaces/core';
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
    @Transform(({value}) => prettyMs(value), {
        toPlainOnly: true,
    })
    duration!: string;

    @Expose()
    mimeType!: string;

    @Expose()
    codecs!: string;

    @Expose()
    @Transform(({value}) => prettyBytes(value), {
        toPlainOnly: true,
    })
    size!: string;

    @Expose()
    quality!: number;

    @Expose()
    frameRate!: string | undefined;

    @Expose()
    backupUrls!: string[];
}

/**
 * @class PlayUrlTransformed
 */
export class PlayUrlTransformed {
    @Expose()
    @Type(() => PlayUrlResourceTransformed)
    audios!: PlayUrlResourceTransformed[];

    @Expose()
    @Type(() => PlayUrlResourceTransformed)
    videos!: PlayUrlResourceTransformed[];
}

interface RawPlayUrlStruct {
    audio_resource: Resource[];
    video: VideoResource[];
}

/**
 * Transform raw "playurl" data
 * @param {RawPlayUrlStruct} data original playurl data.
 * @return {*}
 */
export const transformPlayUrl = (data: RawPlayUrlStruct) => {
    return {
        audios: data.audio_resource.map((audio) => ({
            url: audio.url,
            id: audio.id,
            mimeType: audio.mime_type,
            codecs: audio.codecs,
            size: audio.size,
            duration: audio.duration,
            backupUrls: audio.backup_url,
        })),
        videos: data.video
            .filter((v) => v.video_resource.url.length)
            .map((video) => ({
                url: video.video_resource.url,
                quality: video.stream_info.quality,
                mimeType: video.video_resource.mime_type,
                size: video.video_resource.size,
                codecs: video.video_resource.codecs,
                id: video.video_resource.id,
                duration: +video.video_resource.duration,
                frameRate: video.video_resource.frame_rate ?? undefined,
                backupUrls: video.video_resource.backup_url,
            })),
    };
};
