export default [
  {
    path: "/finance/project",
    meta: "凭证",
    component: () => import("@/views/finance/SearchProject.vue")
  },
  {
    path: "/finance/subject",
    meta: "凭证",
    component: () => import("@/views/finance/SearchSubject.vue")
  },
  {
    path: "/finance/certificate",
    meta: "凭证",
    component: () => import("@/views/finance/SearchCertificate.vue")
  },
  {
    path: "/finance/project/:projectCode/:staffNo",
    meta: "凭证",
    component: () => import("@/views/finance/Account.vue")
  }
];
