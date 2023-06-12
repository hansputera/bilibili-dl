# @bilibili-dl/util

Bilibili-DL Project Utility Package.

## Installation

You can use your favourite package manager btw.

Example:

> npm i @bilibili-dl/util

> pnpm add @bilibili-dl/util

> yarn add @bilibili-dl/util

## Usage

### Compare A object with B object.

```ts
import {compare} from '@bilibili-dl/util';

// JS Object case.
const aObj = {a: 'hello world'};
const bObj = {a: 'hello world'};

compare(aObj, bObj); // true
compare(aObj, {a: 'hello world', x: 1}); // false

// Array case.
const aArr = [1, 2, 3, 4];
const sameArr = [1, 2, 3, 4];
const diffArr = [2, 3, 4, 5, 6];

compare(aArr, sameArr); // true
compare(aArr, diffArr); // false
```

### Cleanup URL

```ts
import {cleanupURL} from '@bilibili-dl/util';

cleanupURL('https://google.com/search?query=pythagoras'); // 'https://google.com/search'
```

### Get Bilibili.tv Video/Season ID

```ts
import {getBtvID} from '@bilibili-dl/util';

getBtvID('https://bilibili.tv/en/video/2045253919'); // { 'videoId': '2045253919' }

getBtvID('https://www.bilibili.tv/id/play/1062554'); // { 'seasonId': '1062554', 'videoId': '-' }

getBtvID('https://www.bilibili.tv/id/play/1062554/11440549'); // { 'seasonId': '1062554', 'videoId': '11440549' }
```

### Match View Text

```ts
import {matchView} from '@bilibili-dl/util';

matchView('Sjiediehuefgu 2K'); // 2K
matchView('Sijwdjiohy3euy3iu 10M'); // 10M
matchView('asjdiasuweu8wf wejfowifwefweig 20k asdasdsada'); // 20k
```

## Json Parse with default value.

```ts
import {jsonParse} from '@bilibili-dl/util';

const sample = '{"a": 1}';
const parse = jsonParse<{
    a: number;
}>(sample);

parse; // { 'a': 1 }

// invalid json example.
const sampleFail = '{"sasas: 1}';
const parse = jsonParse(sampleFail);

parse; // {}
```

## Extract `window.__initialState` from bilibili.tv page

```ts
import {extractInitialState} from '@bilibili-dl/util';

const sample = '<script>window.__initialState = { ... })</script>';

const extracted = extractInitialState(sample);

extracted; // { ... }
```

## Data transformers

```ts
import {
    MetaTransformed,
    SerieMeta,
    EpisodeMeta,
    PhotoMeta,
    PlayUrlResourceTransformed,
    PlayUrlTransformed,
    ItemTransformed,
} from '@bilibili-dl/util';
```

## Authors

-   [@hansputera](https://github.com/hansputera)

## License

MIT
