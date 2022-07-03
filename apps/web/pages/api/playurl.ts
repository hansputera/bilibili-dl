import {NextApiRequest, NextApiResponse} from 'next';
import Validator from 'fastest-validator';
import {
    cleanupURL,
    compare,
    getBtvID,
    instanceToPlain,
    jsonParse,
    PlayUrlTransformed,
} from '@bilibili-dl/util';
import {redis} from '../../lib/redis';
import {getMeta, getPlayUrl} from '@bilibili-dl/core';
import {supportedLocales} from '@bilibili-dl/config/constants.js';
import {maxLifetimeData} from '../../config';

const v = new Validator();
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const validationRequest = v.compile({
        url: {
            type: 'url',
        },
        locale: {
            type: 'enum',
            values: supportedLocales,
            default: 'en_US',
            optional: true,
        },
    })(req.body || req.query);

    if (typeof validationRequest === 'object') {
        return res.status(400).json(validationRequest);
    }

    const video = getBtvID(req.body.url || req.query.url);
    if (!video)
        return res.status(400).json({
            message: 'Please send valid bilibili.tv video url!',
        });

    let result = jsonParse((await redis.get(video.videoId)) ?? '');
    if (compare(result, {}) && !(result instanceof PlayUrlTransformed)) {
        if (video.seasonId?.length && !video.videoId.length) {
            const metaVideo = await getMeta(
                cleanupURL(req.body?.url || req.query?.url),
            );

            if (!metaVideo)
                return res.status(400).json({
                    message: 'Please send valid bilibili.tv video url!',
                });

            video.videoId = metaVideo.episodes.find((s) => s.id.length)?.id!;
        }
        result = await getPlayUrl(
            video.videoId,
            video.seasonId ? 'anime' : 'video',
            req.body.locale || req.query.locale || 'en_US',
        );
        if (typeof result === 'string' || !result) {
            return res.status(201).json({
                message:
                    result || "Couldn't get the playUrl data of this video!",
            });
        }
        await redis.set(
            video.videoId,
            JSON.stringify(
                instanceToPlain(result, {
                    strategy: 'excludeAll',
                }),
            ),
            'EX',
            maxLifetimeData,
        );
    }

    return res.status(200).json(
        result instanceof PlayUrlTransformed
            ? instanceToPlain(result, {
                  strategy: 'excludeAll',
              })
            : result,
    );
};
