import '@/styles/animation.css';
import '@/plugins/snackbar/index';

import axios from 'axios';
import Vue from 'vue';

import vuetify from '@/plugins/vuetify';

import App from '@/App.vue';
import VuetifyConfirm from '@/plugins/confirm-dialog';
import DimForm from '@/plugins/dim-form/Main.vue';
import Appbar from '@/components/common/app-bar/AppBar.vue';
// user-chip components
import UserChip from '@/plugins/user-chip/Main.vue';
import DocIcon from '@/plugins/doc-icon/Main.vue';

import router from '@/router/router';
import store from '@/store/store';
// format date
import DateHelper from '@/utils/DateHelper';

Vue.component('user-chip', UserChip);
Vue.component('dim-form', DimForm);
Vue.component('app-bar', Appbar);
Vue.component('doc-icon', DocIcon);
Vue.component('app-common', App);

Vue.use(VuetifyConfirm);

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
Vue.filter('format', (date: string, fmt: string) => DateHelper.format(date, fmt));

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
Vue.filter('cut', (v: string) => {
  if (v.length && v.length > 8) {
    return `${v.slice(0, 7)} ...`;
  }
  return v;
});

export {
  Vue,
  store
};
