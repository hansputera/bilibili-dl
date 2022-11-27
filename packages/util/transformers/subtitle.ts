import type {SubtitleData} from '@bilibili-dl/interfaces/core/subtitle';
import prettyMilliseconds from 'pretty-ms';

import {PassThrough} from 'node:stream';

/**
 * Convert ms to SRT time
 * @param {number} miliseconds Raw time in miliseconds
 * @return {string}
 */
export const convertToSRTTime = (miliseconds: number): string => {
    const splits = prettyMilliseconds(miliseconds, {
        colonNotation: true,
    }).split(/:/g);

    if (splits.length < 3) {
        splits.unshift('0');
    }

    splits[splits.length - 1] = splits[splits.length - 1]
        .padStart(2, '0')
        .replace(/\./g, '');

    return splits.map((s) => s.padStart(2, '0')).join(':');
};

export const transformSubtitleCall = async (
    subtitle: SubtitleData,
    call: (output: string) => Promise<void>,
): Promise<void> => {
    subtitle.body.forEach((item, index) => {
        if (index === subtitle.body.length - 1) {
            call('done');
        } else
            call(
                `${index + 1}\n${convertToSRTTime(
                    item.from * 1000,
                )} --> ${convertToSRTTime(item.to * 1000)}\n${item.content}`,
            );
    });
};

export const transformSubtitle = (subtitle: SubtitleData): PassThrough => {
    const s = new PassThrough();
    transformSubtitleCall(subtitle, async (output) => {
        s.write(output, 'utf8');
    });

    return s;
};
