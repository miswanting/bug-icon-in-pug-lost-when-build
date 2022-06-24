# Icons in Pug lost when Build

Similar Issue: [#168](https://github.com/unocss/unocss/issues/168)

Bugs occur when the following conditions are met.

1. Script tag is not empty.(Even Only Comments)
   - Only `\n`s in it, fine;
   - Without script tag, fine;
2. `@iconify-json/*` icon in pug template
   - In my case, it\`s `.i-mdi-window-close`(or anything) in `@iconify-json/mdi`.
   - Other css related iconset are untested. 
   - html template, fine.
3. `vite build`
   - Everything just fine in dev mode, but there\`s no icon code in generated css file when built.

## Reproduce Steps

package.json

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "init": "pnpm i",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@iconify-json/mdi": "^1.1.22",
    "@unocss/extractor-pug": "^0.39.3",
    "@vitejs/plugin-vue": "^2.3.3",
    "pug": "^3.0.2",
    "unocss": "^0.39.3",
    "vite": "^2.9.12",
    "vue": "^3.2.37"
  }
}
```

vite.config.ts

```typescript
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    unocss()
  ]
})
```

unocss.config.ts

```typescript
import extractorPug from '@unocss/extractor-pug'
import {
  defineConfig,
  extractorSplit,
  presetIcons
} from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
  ],
  extractors: [
    extractorPug(),
    extractorSplit,
  ],
})

```

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node"
  }
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>myapp</title>
  <script src="./src/index.ts" type="module"></script>
</head>

<body></body>

</html>
```

src/index.ts

```typescript
import 'uno.css'
import { createApp } from "vue"
import Index from "./index.vue"

const app = createApp(Index)

app.mount("body")
```

src/index.vue

```
<script setup lang="ts">
// Comments are also not ok
</script>
<template lang="pug">
.i-mdi-window-close
</template>
```

