import vuetify from '@/plugins/vuetify';
import Policy from './Policy.vue';
import { Vue, store } from '@/main';
import router from './router';


new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Policy)
}).$mount('#app');
