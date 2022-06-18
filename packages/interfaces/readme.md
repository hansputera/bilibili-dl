# @bilibili-dl/interfaces

Just TypeScript Declaration/Interface for Bilibili-DL Project.


## Installation

Install `@bilibili-dl/interfaces`

```bash
  npm i @bilibili-dl/interfaces -D
```
or
```bash
  pnpm add @bilibili-dl/interfaces -D
```
or
```bash
  yarn add @bilibili-dl/interfaces -D
```

## Usage/Examples

```javascript
import type {
    Resource,
    VideoStreamInfo,
    VideoResource,
} from '@bilibili-dl/interfaces/core';

const audio: Resource = {
    bandwith: 68753,
    duration: 1451069,
    quality: 30216,
    size: 12470549,
    url: 'https://upos-bstar1-mirrorakam.akamaized.net/iupxcodeboss/py/iv/m210909a227j91t6wat3yt1zlisuivpy-1-2a1301000023.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=\u0026uipk=5\u0026nbs=1\u0026deadline=1655535387\u0026gen=playurlv2\u0026os=akam\u0026oi=1912992816\u0026trid=413cb1f8eae04300a66ac3696f192c50i\u0026mid=1917065022\u0026platform=pc\u0026upsig=7e8b87b17dd82945e37b347944428f53\u0026uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform\u0026hdnts=exp=1655535387~hmac=c6e679dcbbb8b1d973861e831031b3921c48db6465cedeb6ce875c381c4238b2\u0026bvc=vod\u0026nettype=0\u0026orderid=0,1\u0026logo=00000000',
    id: '/iupxcodeboss/py/iv/m210909a227j91t6wat3yt1zlisuivpy-1-2a1301000023.m4s',
    codecs: 'mp4a.40.2',
    mime_type: 'audio/mp4',
};

const streamInfo: VideoStreamInfo = {
    desc_words: '480P',
    quality: 112,
};

const video: VideoResource = {
    audio_quality: 30216,
    stream_info: streamInfo,
    video_resource: {
        ...
    } // It's "Resource"
}
```


## Authors

- [@hansputera](https://github.com/hansputera)
## License

[MIT](https://choosealicense.com/licenses/mit/)

