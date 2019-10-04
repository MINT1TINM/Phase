export default [
  {
    path: "/certificate",
    meta: "凭证",
    component: () => import("@/views/certificate/Project.vue")
  },
  {
    path: "/certificate/:projectCode/:staffNo",
    meta: "凭证",
    component: () => import("@/views/certificate/Account.vue")
  }
];
