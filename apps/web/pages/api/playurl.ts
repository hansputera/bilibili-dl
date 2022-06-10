import {NextApiRequest, NextApiResponse} from 'next';
import Validator from 'fastest-validator';
import {
    getBtvID,
    instanceToPlain,
    jsonParse,
    PlayUrlTransformed,
} from '@bilibili-dl/util';
import {redis} from '../../lib/redis';
import {getPlayUrl} from '@bilibili-dl/core';
import {maxLifetimeData} from '../../config';

const v = new Validator();
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const validationRequest = v.compile({
        url: {
            type: 'url',
        },
    })(req.body || req.query);

    if (typeof validationRequest === 'object') {
        return res.status(400).json(validationRequest);
    }

    const videoId = getBtvID(req.body.url || req.query.url);
    if (!videoId)
        return res.status(400).json({
            message: 'Please send valid bilibili.tv video url!',
        });

    let result = jsonParse((await redis.get(videoId)) ?? '');
    if (!(result instanceof PlayUrlTransformed)) {
        result = await getPlayUrl(videoId);
        if (typeof result === 'string' || !result) {
            return res.status(201).json({
                message:
                    result || "Couldn't get the playUrl data of this video!",
            });
        }
        await redis.set(videoId, JSON.stringify(result), 'EX', maxLifetimeData);
    }

    return res.status(200).json(
        result instanceof PlayUrlTransformed
            ? instanceToPlain(result, {
                  strategy: 'excludeAll',
              })
            : result,
    );
};
