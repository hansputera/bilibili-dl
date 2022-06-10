/* eslint-disable new-cap */
import {Expose, Transform, Type} from 'class-transformer';

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
}

// TODO: completing meta data transform.
export const transformToReadable = (data: any) => {
    return {
        title: data.sharedData.title,
        url: data.sharedData.url,
        photo: {
            vertical: data.sharedData.vertical_pic,
            horizontal: data.sharedData.horizontal_pic,
        },
        description: data.sharedData.desc,
        id: data.OgvVideo.epId || data.UgcVideo.videoData.aid,
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
    };
};
