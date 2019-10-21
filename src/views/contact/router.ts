import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            meta: '人脉',
            component: () => import('@/views/contact/ContactGroup.vue'),
            children: [
                {
                    path: '/:group',
                    component: () => import('@/views/contact/ContactList.vue'),
                    children: [
                        {
                            path: '/:group/:userID',
                            component: () => import('@/views/contact/ContactInfo.vue')
                        }
                    ]
                }
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next({ path: '/all' });
    }
    next();
});

export default router;
