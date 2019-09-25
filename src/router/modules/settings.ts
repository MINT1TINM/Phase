export default [
  {
    path: "/settings",
    meta: "设置",
    component: () => import("@/views/settings/Settings.vue"),
    children: [
      {
        path: "/settings/profile",
        meta: "个人信息",
        component: () => import("@/components/settings/Profile.vue")
      },
      {
        path: "/settings/company",
        meta: "企业 & 组织",
        component: () => import("@/components/settings/Company.vue")
      },
      {
        path: "/settings/privacy",
        meta: "隐私",
        component: () => import("@/components/settings/Privacy.vue")
      },
      {
        path: "/settings/security",
        meta: "安全",
        component: () => import("@/components/settings/Security.vue")
      },
      {
        path: "/settings/notification",
        meta: "通知",
        component: () => import("@/components/settings/Notification.vue")
      }
    ]
  }
];
