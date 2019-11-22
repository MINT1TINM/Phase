import vuetify from '@/plugins/vuetify';

import Home from './Home.vue';

import { Vue, store } from '@/main';

new Vue({
  store,
  vuetify,
  render: (h: any) => h(Home)
}).$mount('#app');
