import '@/plugins/snackbar/index';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import zhHans from 'vuetify/src/locale/zh-Hans';

Vue.use(Vuetify);

const path = window.location.pathname.split('/')[1];
let themeColor = '';
switch (path) {
  case 'project':
    themeColor = colors.lightBlue.base;
    break;
  case 'contact':
    themeColor = colors.deepPurple.lighten2;
    break;
  case 'sheet':
    themeColor = colors.teal.lighten2;
    break;
  case 'finance':
    themeColor = colors.blue.darken1;
    break;
  case 'event':
    break;
  case 'admin':
    themeColor = colors.grey.lighten1;
    break;
  default:
    themeColor = colors.purple.lighten2;
    break;
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
        primary: themeColor,
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
