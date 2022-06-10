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
        genre: data.OgcVideo.seasonData
            ? data.OgcVideo.seasonData.styles
                  .map((style: {title: string}) => style.title)
                  .join(', ')
            : '-',
        originTitle: data.OgcVideo.seasonData
            ? data.OgcVideo.seasonData.origin_name
            : undefined,
    };
};
