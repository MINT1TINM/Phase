import vuetify from '@/plugins/vuetify';
import Flow from './Flow.vue';
import { Vue, store } from '@/main';
import router from './router';

new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Flow)
}).$mount('#app');
