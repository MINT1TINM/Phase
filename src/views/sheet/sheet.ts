import vuetify from '@/plugins/vuetify';
import Sheet from './Sheet.vue';
import { Vue, store } from '@/main';
import router from './router';


new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Sheet)
}).$mount('#app');
