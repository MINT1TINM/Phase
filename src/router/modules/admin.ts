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
        component: () => import("@/components/admin/Group.vue")
      }
    ]
  }
];
