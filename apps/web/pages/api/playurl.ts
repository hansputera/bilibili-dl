import {NextApiRequest, NextApiResponse} from 'next';
import Validator from 'fastest-validator';
import {compare, getBtvID, jsonParse} from '@bilibili-dl/util';
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

    if (typeof validationRequest === 'string') {
        return res.status(400).json(validationRequest);
    }

    const videoId = getBtvID(req.body.url || req.query.url);
    if (!videoId)
        return res.status(400).json({
            message: 'Please send valid bilibili.tv video url!',
        });

    let result = jsonParse((await redis.get(videoId)) ?? '', {});
    if (compare(result, {})) {
        result = await getPlayUrl(videoId);
        await redis.set(videoId, JSON.stringify(result), 'EX', maxLifetimeData);
    }

    return res.status(200).json(result);
};
