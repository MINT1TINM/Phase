export default [
  {
    path: "/settings",
    meta: "设置",
    component: () => import("@/views/settings/Settings"),
    children: [
      {
        path: "/settings/profile",
        meta: "个人信息",
        component: () => import("@/components/settings/Profile")
      },
      {
        path: "/settings/notification",
        meta: "通知",
        component: () => import("@/components/settings/Notification")
      }
    ]
  }
];
