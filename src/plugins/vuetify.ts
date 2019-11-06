import '@/plugins/snackbar/index';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import zhHans from 'vuetify/src/locale/zh-Hans';
import store from '@/store/store';
import { App } from '@/types/system';

Vue.use(Vuetify);

const path = window.location.pathname.split('/')[1];

let themeColor = colors.purple.lighten2;
let themeColorDark = colors.purple.lighten2;

const currentApp = store.getters['system/currentApp'](path) as App;
if (currentApp) {
  themeColor = currentApp.themeColor;
  themeColorDark = currentApp.themeColorDark;
}

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: themeColor,
        secondary: '#424242',
        accent: '#82B1FF',
        error: colors.red.darken1,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      light: {
        primary: themeColorDark,
        secondary: '#424242',
        accent: '#82B1FF',
        error: colors.red.darken1,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  icons: {
    iconfont: 'mdi',
  },
});
