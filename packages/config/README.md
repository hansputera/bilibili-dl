# @bilibili-dl/config

It's just my useless project configuration.

## Installation

Install `@bilibili-dl/config`

```bash
  npm install @bilibili-dl/config
```

or

```bash
  yarn add @bilibili-dl/config
```

or

```bash
  pnpm add @bilibili-dl/config
```

## Usage/Examples

-   If I want use eslint configuration:

```cjs
// .eslintrc.cjs
module.exports = require('@bilibili-dl/config/esint.cjs');
```

-   Eslint configuration. But, with TypeScript Support:

```cjs
// .eslintrc.cjs
module.exports = require('@bilibili-dl/config/eslint-ts.cjs');
```

-   Prettier configuration

```cjs
// .prettierrc.cjs
module.exports = require('@bilibili-dl/config/prettier.cjs');
```

-   TypeScript options/config:

```json
// tsconfig.json
{
    "extends": "@bilibili-dl/config/tsconfig.base.json"
}
```

-   Project config stuff:

```js
import {
    baseURL,
    apiBaseURL,
    getGatewayURL,
    supportedLocales,
} from '@bilibili-dl/config/constants.js';

const videoURL = new URL('./en/play/34661', baseURL);
console.log(videoURL.href); // https://www.bilibili.tv/en/play/34661

const searchEndpointAPI = new URL(
    getGatewayURL('v2').concat('search?keyword=Enen+No+Shouboutai'),
    apiBaseURL,
);

console.log(searchEndpointAPI.href); // https://api.bilibili.tv/intl/gateway/web/v2/search?keyword=Enen+No+Shouboutai
console.log(supportedLocales); // ['en_US', 'id_ID', 'ms_MY', 'vi_VN', 'th_TH']
```

## Authors

-   [@hansputera](https://github.com/hansputera)

## License

[MIT](https://choosealicense.com/licenses/mit/)
