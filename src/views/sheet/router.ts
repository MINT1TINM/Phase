import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            meta: '表单',
            component: () => import('@/views/sheet/SheetHome.vue'),
        },
        {
            path: '/design/:type',
            component: () => import('@/views/sheet/Design.vue'),
        },
    ]
});

export default router;
