import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '',
            meta: '管理',
            component: () => import('@/views/admin/AdminMenu.vue'),
            children: [
                {
                    path: '/home',
                    component: () => import('@/components/admin/Home.vue'),
                },
                {
                    path: '/department',
                    component: () => import('@/components/admin/department/Department.vue'),
                    children: [
                        {
                            path: '/department/:departmentID',
                            component: () => import('@/components/admin/department/Member.vue'),
                        },
                    ],
                },
                {
                    path: '/group',
                    component: () => import('@/components/admin/group/Group.vue'),
                    children: [
                        {
                            path: '/group/:groupID',
                            component: () => import('@/components/admin/group/GroupInfo.vue'),
                        },
                    ],
                },
                {
                    path: '/user',
                    component: () => import('@/components/admin/user/User.vue'),
                },
            ],
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next({ path: '/home' });
    }
    next();
});

export default router;
