import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '',
            meta: '设置',
            component: () => import('@/views/settings/SettingsMenu.vue'),
            children: [
                {
                    path: '/profile',
                    meta: '个人信息',
                    component: () => import('@/components/settings/Profile.vue'),
                },
                {
                    path: '/privacy',
                    meta: '隐私',
                    component: () => import('@/components/settings/Privacy.vue'),
                },
                {
                    path: '/security',
                    meta: '安全',
                    component: () => import('@/components/settings/Security.vue'),
                },
                {
                    path: '/notification',
                    meta: '通知',
                    component: () => import('@/components/settings/Notification.vue'),
                },
            ],
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next({ path: '/profile' });
    }
    next();
});


export default router;
