import vuetify from '@/plugins/vuetify';
import Login from './Login.vue';
import { Vue, store } from '@/main';

new Vue({
  store,
  vuetify,
  render: (h: any) => h(Login)
}).$mount('#app');
