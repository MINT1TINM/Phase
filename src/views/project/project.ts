import vuetify from '@/plugins/vuetify';
import Project from './Project.vue';
import router from './router';
import { Vue, store } from '@/main';


new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(Project)
}).$mount('#app');
