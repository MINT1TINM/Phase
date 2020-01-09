import vuetify from '@/plugins/vuetify';
import Admin from './Admin.vue';
import { Vue, store } from '@/main';
import router from './router';

new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Admin)
}).$mount('#app');
