import vuetify from '@/plugins/vuetify';
import Contact from './Contact.vue';
import { Vue, store } from '@/main';
import router from './router';


new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Contact)
}).$mount('#app');
