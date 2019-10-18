import vuetify from '@/plugins/vuetify';
import Finance from './Finance.vue';
import { Vue, store } from '@/main';
import router from './router';


new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Finance)
}).$mount('#app');
