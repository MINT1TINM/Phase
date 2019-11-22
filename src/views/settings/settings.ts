import vuetify from '@/plugins/vuetify';
import Settings from './Settings.vue';
import router from './router';
import { Vue, store } from '@/main';

new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Settings)
}).$mount('#app');
