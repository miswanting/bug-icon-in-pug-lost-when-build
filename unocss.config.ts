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
