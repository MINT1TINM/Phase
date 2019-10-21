import vuetify from '@/plugins/vuetify';
import router from './router';
import Ticket from './Ticket.vue';
import { Vue, store } from '@/main';

new Vue({
  store,
  vuetify,
  router,
  render: (h: any) => h(Ticket)
}).$mount('#app');
