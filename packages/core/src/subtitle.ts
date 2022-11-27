import {getGatewayURL} from '@bilibili-dl/config/constants.js';
import type {
    SubtitleData,
    SubtitleResponse,
} from '@bilibili-dl/interfaces/core/subtitle';
import {fetchAPI, Got} from '@bilibili-dl/util';

export const getSubtitle = async (
    id: string,
    locale: string,
): Promise<SubtitleData | string> => {
    const response = await fetchAPI(getGatewayURL('v2').concat('subtitle'), {
        searchParams: {
            s_locale: 'en_US',
            platform: 'web',
            episode_id: id,
            spm_id: 'bstar-web.pgc-video-detail.0.0',
            from_spm_id: 'bstar-web.search-result.0.0',
        },
        headers: {
            Origin: 'https://www.bilibili.tv',
            Referer: 'https://www.bilibili.tv/'.concat(locale),
        },
    }).json<SubtitleResponse>();

    if (response.message.length > 1) return response.message;
    else {
        const sub = response.data.subtitles.find((s) =>
            locale.startsWith(
                s.lang_key.toLowerCase().split('-').at(0) as string,
            ),
        );
        if (!sub) return "Couldn't find the subtitle";

        const twoResponse = await Got.got
            .get(sub.url)
            .json<SubtitleData>()
            .catch(() => undefined);
        if (!twoResponse) return "Couldn't get the subtitle contents!";

        return twoResponse;
    }
};
