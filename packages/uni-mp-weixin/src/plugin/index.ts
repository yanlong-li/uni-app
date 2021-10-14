import { Plugin } from 'vite'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin, {
  UniMiniProgramPluginOptions,
} from '@dcloudio/uni-mp-vite'

import source from './project.config.json'

const uniMiniProgramWeixinPlugin: Plugin = {
  name: 'vite:uni-mp-weixin',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: JSON.stringify('false'),
      },
    }
  },
}

const projectConfigFilename = 'project.config.json'

const options: UniMiniProgramPluginOptions = {
  vite: {
    alias: {
      'uni-mp-runtime': resolveBuiltIn(
        '@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js'
      ),
    },
    copyOptions: {
      assets: ['wxcomponents'],
      targets: [
        {
          src: [
            'theme.json',
            'sitemap.json',
            'ext.json',
            'custom-tab-bar',
            'functional-pages',
            projectConfigFilename,
          ],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
      ],
    },
  },
  global: 'wx',
  app: {
    darkmode: true,
    subpackages: true,
  },
  project: {
    filename: projectConfigFilename,
    source,
  },
  template: {
    extname: '.wxml',
    directive: 'wx:',
  },
  style: {
    extname: '.wxss',
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px',
      '--window-left': '0px',
      '--window-right': '0px',
    },
  },
  filter: {
    extname: '.wxs',
    tag: 'wxs',
  },
}

export default [uniMiniProgramWeixinPlugin, ...initMiniProgramPlugin(options)]
