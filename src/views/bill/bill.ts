import vuetify from '@/plugins/vuetify';
import router from './router';
import Bill from './Bill.vue';
import { Vue, store } from '@/main';

new Vue({
  store,
  vuetify,
  router,
  render: (h: any) => h(Bill)
}).$mount('#app');
