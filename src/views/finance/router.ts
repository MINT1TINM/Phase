import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/views/finance/Finance.vue'),
            children: [
                {
                    path: '/project',
                    meta: '凭证',
                    component: () => import('@/views/finance/SearchProject.vue'),
                },
                {
                    path: '/subject',
                    meta: '凭证',
                    component: () => import('@/views/finance/SearchSubject.vue'),
                },
                {
                    path: '/certificate',
                    meta: '凭证',
                    component: () => import('@/views/finance/SearchCertificate.vue'),
                },
                {
                    path: '/project/:projectCode/:staffNo',
                    meta: '凭证',
                    component: () => import('@/views/finance/Account.vue'),
                },
            ]
        },

    ]
});

export default router;
