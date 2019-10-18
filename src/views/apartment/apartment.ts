import vuetify from '@/plugins/vuetify';

import Apartment from './Apartment.vue';
import { Vue, store } from '@/main';

new Vue({
  store,
  vuetify,
  render: (h: any) => h(Apartment)
}).$mount('#app');
