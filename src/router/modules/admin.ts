export default [
  {
    path: "/admin",
    meta: "管理",
    component: () => import("@/views/admin/Admin.vue"),
    children: [
      {
        path: "/admin/home",
        component: () => import("@/components/admin/Home.vue")
      },
      {
        path: "/admin/department",
        component: () => import("@/components/admin/Department.vue")
      },
      {
        path: "/admin/group",
        component: () => import("@/components/admin/group/Group.vue"),
        children: [
          {
            path: "/admin/group/:groupID",
            component: () => import("@/components/admin/group/GroupInfo.vue")
          }
        ]
      },
      {
        path: "/admin/user",
        component: () => import("@/components/admin/user/User.vue")
      }
    ]
  }
];
