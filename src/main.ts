import '@/styles/animation.css';
import '@/styles/style.css';

import axios from 'axios';
import Vue from 'vue';

import './registerServiceWorker';

import App from '@/App.vue';

import Appbar from '@/components/common/app-bar/AppBar.vue';

import ConfirmDialog from '@/plugins/vuetify-plugins/confirm-dialog';
import DimForm from '@/plugins/vuetify-plugins/dim-form/Main.vue';
import SnackBar from '@/plugins/vuetify-plugins/snackbar';
import UserChip from '@/plugins/vuetify-plugins/user-chip/Main.vue';
import DocIcon from '@/plugins/vuetify-plugins/doc-icon/Main.vue';
import TimeLine from '@/plugins/vuetify-plugins/dim-timeline/Main.vue';
import SearchSupplier from '@/components/common/search/SearchSupplier.vue';

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
Viewer.setDefaults({
  toolbar: false,
  navbar: false
});
Vue.use(Viewer);

Vue.component('user-chip', UserChip);
Vue.component('dim-form', DimForm);
Vue.component('app-bar', Appbar);
Vue.component('doc-icon', DocIcon);
Vue.component('app-common', App);
Vue.component('dim-timeline', TimeLine);
Vue.component('SearchSupplier', SearchSupplier);
Vue.use(ConfirmDialog);
Vue.use(SnackBar);

import store from '@/store/store';
// format date
import DateHelper from '@/utils/DateHelper';

Vue.config.productionTip = false;

// axios config
axios.interceptors.request.use((config: any) => {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';

  try {
    config.headers.authorization = `PHASE ${store.getters['user/authorization'].token}`;
  } catch (err) {
    console.log(err);
  }
  return config;
});

// http -> https for m***g wechat avatar
Vue.filter('httpsfy', (url: string) => {
  const realUrl = url.substring(4);
  return `https${realUrl}`;
});

// format date
Vue.filter('format', (date: string, fmt: string) =>
  DateHelper.format(date, fmt)
);

// get weekday
Vue.filter('weekday', (date: string) => DateHelper.getWeekDay(date));

// make avatar
Vue.filter('avatar', (v: string) => {
  if (v) {
    return v.slice(0, 1);
  }
  return '';
});

// cut long string
Vue.filter('cut', (v: string, len?: number) => {
  if (len && v.length && v.length > len) {
    return `${v.slice(0, len - 1)} ...`;
  }
  if (!len && v.length && v.length > 8) {
    return `${v.slice(0, 7)} ...`;
  }

  return v;
});

export { Vue, store };
