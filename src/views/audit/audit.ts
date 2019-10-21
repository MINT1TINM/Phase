import vuetify from '@/plugins/vuetify';
import router from './router';
import Audit from './Audit.vue';
import { Vue, store } from '@/main';

new Vue({
  store,
  vuetify,
  router,
  render: (h: any) => h(Audit)
}).$mount('#app');
