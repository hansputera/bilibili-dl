/* eslint-disable new-cap */
import {baseURL} from '@bilibili-dl/config/constants';
import {Expose, Transform, Type} from 'class-transformer';
import {cleanupURL} from '..';

/**
 * @class PhotoMeta
 */
export class PhotoMeta {
    @Expose()
    vertical!: string;

    @Expose()
    horizontal!: string;
}
/**
 * @class EpisodeMeta
 */
export class EpisodeMeta {
    @Expose()
    title!: string;

    @Expose()
    @Transform(({value}) => value.toString())
    id!: string;

    @Expose()
    thumbnail!: string;

    @Expose()
    @Transform(({value}) => new Date(value), {
        toClassOnly: true,
    })
    publishedAt!: Date;
}

/**
 * @class MetaTransformed
 */
export class MetaTransformed {
    @Expose()
    title!: string;

    @Expose()
    url!: string;

    @Expose()
    @Type(() => PhotoMeta)
    photo!: PhotoMeta;

    @Expose()
    description!: string;

    @Expose()
    id!: string;

    @Expose()
    thumbnail!: string;

    @Expose()
    genre!: string;

    @Expose()
    originTitle!: string;

    @Expose()
    @Transform(({value}) => new Date(value), {
        toClassOnly: true,
    })
    publishDate!: string;

    @Expose()
    @Type(() => EpisodeMeta)
    episodes!: EpisodeMeta[];

    @Expose()
    limitAreas!: string[];
}

// TODO: completing meta data transform.
export const transformMeta = (data: any) => {
    return {
        title: data.shareData.title,
        url: data.shareData.url,
        photo: {
            vertical: data.shareData.vertical_pic,
            horizontal: data.shareData.horizontal_pic,
        },
        description: data.shareData.desc,
        id: data.OgvVideo.epId || data.UgcVideo.videoData.aid,
        season_id: data.OgvVideo.seasonData
            ? data.OgvVideo.seasonData.season_id
            : undefined,
        thumbnail: data.UgcVideo.videoData
            ? data.UgcVideo.videoData.cover
            : data.OgvVideo.epDetail.cover,
        genre: data.OgvVideo.seasonData
            ? data.OgvVideo.seasonData.styles
                  .map((style: {title: string}) => style.title)
                  .join(', ')
            : '-',
        originTitle: data.OgvVideo.seasonData
            ? data.OgvVideo.seasonData.origin_name
            : undefined,
        publishDate: data.OgvVideo.epDetail
            ? data.OgvVideo.epDetail.publish_time
            : data.UgcVideo.videoData.formatted_pub_date,
        episodes:
            data.OgvVideo.allEpisodeList?.map(
                (e: {
                    title_display: string;
                    cover: string;
                    episode_id: number;
                    publish_time: string;
                }) => ({
                    title: e.title_display,
                    thumbnail: e.cover,
                    id: e.episode_id,
                    publishedAt: e.publish_time,
                    url: `${cleanupURL(
                        new URL(data.shareData.url, baseURL),
                    ).replace(
                        /\/(\d+)(\/\d+)?/g,
                        `/${data.OgvVideo.seasonData.season_id}${
                            data.OgvVideo.epId !== e.episode_id
                                ? `/${e.episode_id}`
                                : ''
                        }`,
                    )}`,
                }),
            ) ?? undefined,
        limitAreas: data.OgvVideo.seasonData
            ? data.OgvVideo.seasonData.limit_areas
            : undefined,
    };
};
