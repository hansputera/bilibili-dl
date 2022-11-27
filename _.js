import p from 'pretty-ms';
import { PassThrough } from 'stream';

const x = p(6000.10 * 1000, {
    colonNotation: true,
});

function toSrtTime(str) {
    const splits = str.split(/:/g);
    if (splits.length > 3) return '';

    const stream = new PassThrough();

    
}

toSrtTime(x);