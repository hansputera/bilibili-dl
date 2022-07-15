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
 * @class SerieMeta
 */
export class SerieMeta {
    @Expose()
    title!: string;

    @Expose()
    id!: string;

    @Expose()
    url!: string;
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

    @Expose()
    @Type(() => SerieMeta)
    series!: SerieMeta[];
}

// TODO: completing meta data transform.
export const transformMeta = (data: any) => {
    const sectionsList = data.ogv?.season?.sectionsList?.reduce(
        (
            prev: {
                episodes: Record<string, unknown>[];
            },
            curr: {
                episodes: Record<string, unknown>[];
            },
        ) => prev.episodes.concat(curr.episodes),
    );

    return {
        title: data.share.shareInfo.title,
        url: data.share.shareInfo.url,
        photo: {
            vertical: data.share.shareInfo.vertical_pic ?? undefined,
            horizontal: data.share.shareInfo.horizontal_pic,
        },
        description: data.share.shareInfo.desc,
        id: data.ogv?.epId || data.ugc.aid,
        season_id: data.ogv?.season ? data.ogv.season.season_id : undefined,
        thumbnail: data.ugc?.archive
            ? data.ugc?.archive.cover
            : data.ogv?.season.horizontal_cover,
        genre: data.ogv?.season
            ? data.ogv.season.styles
                  .map((style: {title: string}) => style.title)
                  .join(', ')
            : '-',
        originTitle: data.ogv?.season ? data.ogv.season.origin_name : undefined,
        publishDate: data.ogv?.season
            ? data.ogv.season.player_time.replace(/[a-zA-Z]/g, '')
            : data.ugc.archive.formatted_pub_date,
        episodes:
            sectionsList?.map(
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
                        new URL(data.share.shareInfo.url, baseURL),
                    ).replace(
                        /\/(\d+)(\/\d+)?/g,
                        `/${data.ogv.season.season_id}${
                            data.ogv.epId !== e.episode_id
                                ? `/${e.episode_id}`
                                : ''
                        }`,
                    )}`,
                }),
            ) ?? undefined,
        limitAreas: data.ogv?.season ? data.ogv.season.limit_areas : undefined,
        series: data.ogv?.series
            ? data.ogv.series.map(
                  (serie: {title: string; season_id: number}) => ({
                      title: serie.title,
                      id: serie.season_id.toString(),
                      url: `${cleanupURL(
                          new URL(data.share.shareInfo.url, baseURL),
                      ).replace(/\/(\d+)(\/\d+)?/g, `/${serie.season_id}`)}`,
                  }),
              )
            : undefined,
    };
};
