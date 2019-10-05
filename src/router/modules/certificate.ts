export default [
  {
    path: "/certificate/project",
    meta: "凭证",
    component: () => import("@/views/certificate/SearchProject.vue")
  },
  {
    path: "/certificate/subject",
    meta: "凭证",
    component: () => import("@/views/certificate/SearchSubject.vue")
  },
  {
    path: "/certificate/project/:projectCode/:staffNo",
    meta: "凭证",
    component: () => import("@/views/certificate/Account.vue")
  }
];
